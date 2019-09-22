<template>
  <div class="about">

    <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="estimateList"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
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
        { text: 'Reason', value: 'reason' },
        { text: 'Wait estimate', value: 'wait_estimate' }
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

      setTimeout(() => {this.timeoutLoop()}, 1000)
    },
    fetch: function () {
      var todos = JSON.parse(localStorage.getItem(this.key) || '[]')
      return todos
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
        statistics[reason].avg=Math.floor(statistics[reason].time_in_queue / statistics[reason].client_count / 1000)
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
