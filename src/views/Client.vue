<template>
  <div class="client">
    <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="estimateList"
      :items-per-page="5"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'REASON', value: 'reason' },
        { text: 'WAIT ESTIMATE (min)', value: 'wait_estimate' }
      ],
      estimateList: [],
      reason: {
        'Private': true,
        'Withdrawal/Deposit': true,
        'Business': true,
        'Investment': true
      },
      key: 'raktas',
      timeout: null,
      statistics: {}
    }
  },
  beforeMount () {
    this.timeoutLoop()
  },
  beforeDestroy () {
    clearTimeout(this.timeout);
  },
  methods: {
    timeoutLoop: function () {
      this.itemFilter()
      this.calcTimeEstimates()

      setTimeout(() => {this.timeoutLoop()}, 5000)
    },
    fetch: function () {
      var data = JSON.parse(localStorage.getItem(this.key) || '[]')
      return data
    },
    itemFilter: function () {
      var visits = this.fetch()
      var statistics={}
      for (var reason in this.reason) {
        statistics[reason]={ time_in_queue: 0, client_count: 0, avg: 0}
      }

      for(var i in visits){            
        if(visits[i].status !== 'Complete') {
          continue
        }
        var time_in_queue = visits[i].date_processing_start - visits[i].date_created;
        statistics[visits[i].reason].client_count+=1
        statistics[visits[i].reason].time_in_queue+=time_in_queue
      }
      
      for (reason in this.reason) {
        statistics[reason].avg=Math.floor(statistics[reason].time_in_queue / statistics[reason].client_count / 1000 / 60 )
      }
      this.statistics = statistics
    },
    calcTimeEstimates: function () {      
      var visits = this.fetch()
      this.estimateList = []
      for(var i in visits){
        if(visits[i].status === 'In queue'){
          var clientItem = visits[i]
          this.estimateList.push({
            id: clientItem.id,
            reason: clientItem.reason,
            wait_estimate: this.getVisitEstimate(clientItem.id, clientItem.reason),
          })
        }
      }
    },
    getVisitEstimate: function (clientId, reason) {
      var visits = this.fetch()
      var clientsInFront = 0
      for(var i in visits){
        if(visits[i].reason == reason && 
        (visits[i].status === 'In queue' || visits[i].status === 'In progress') &&
        visits[i].id < clientId ){
          clientsInFront++
        }
      }
      return Math.floor(this.statistics[reason].avg * (clientsInFront + 1))
    }
  }
}
</script>
