<template>
<div class="specialist">
    <v-pagination
      v-model="page"
      :length="pageCount"
      :page="length"
    ></v-pagination>
    <v-card>
      <v-col>
        <v-row class="mt-12">
            <v-checkbox hide-details v-model="reason.Private" label="Private"></v-checkbox>
            <v-checkbox hide-details v-model="reason.Business" label="Business"></v-checkbox>
            <v-checkbox hide-details v-model="reason.Investment" label="Investment"></v-checkbox>
            <v-checkbox hide-details v-model="reason['Withdrawal/Deposit']" label="Withdrawal/Deposit"></v-checkbox>
        </v-row>
        </v-col>
    </v-card>
<v-card>
    <div
      v-for="item in displayedPosts"
      :key="item.id">
      <v-list-item>
          <v-list-item-icon>
            <v-icon large color="indigo">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.reason}}</v-list-item-title>
            <v-list-item-subtitle>{{item.id}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
          <template v-if="item.assignee == receptionist.id">
            <v-btn v-on:click="complete(item.id)">Mark as done</v-btn>
          </template>
          <template v-else> 
            <v-btn v-on:click="assignToMe(item.id)">Assign to me </v-btn>
          </template>
          </v-list-item-icon>
      </v-list-item>
      <v-divider/>
      </div>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbar_timeout"
    >
      {{ text }}
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data: function () {
    return {      
      snackbar: false,
      text: 'My timeout is set to 2000.',
      snackbar_timeout: 5000,
      page: 1,
      perPage: 5,
      length: 1,

      reason: {
        'Private': true,
        'Withdrawal/Deposit': true,
        'Business': true,
        'Investment': true
      },
      receptionist: {
        id: '123',
        name: 'Specialist-Name',
        room: '1'
      },
      key: 'raktas',
      items: [],
      timeout: null
    }
  },
  computed: {
		displayedPosts () {
			return this.paginate();
		},
    pageCount: function () {
      return Math.ceil(this.items.length / this.perPage)
    }
  },
  beforeMount () {
    this.timeoutLoop()
  },
  beforeDestroy () {
    clearTimeout(this.timeout);
  },
  methods: {
    paginate () {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  this.items.slice(from, to);
		},
    timeoutLoop: function () {
      this.items = this.fetch()
      this.itemFilter()
      setTimeout(() => {this.timeoutLoop()}, 200)
    },
    complete: function (itemId) {
      var allItems = this.fetch()
      for (var i in allItems){
        if (allItems[i].id == itemId) {
          allItems[i].status = 'Complete'
          allItems[i].date_processing_end = Math.floor(Date.now())
          this.text = 'Finished processing client in ' + Math.ceil((allItems[i].date_processing_end - allItems[i].date_processing_start) / 1000 / 60 ) + ' minutes'
          this.snackbar = true
        }
      }
      this.save(allItems)
    },
    assignToMe: function (itemId) {
      var allItems = this.fetch()
      for (var i in allItems){
        if (allItems[i].id == itemId) {
          allItems[i].assignee = this.receptionist.id
          allItems[i].status = 'In progress'
          allItems[i].destination = this.receptionist.room
          allItems[i].date_processing_start= Math.floor(Date.now())
        }
      }
      this.save(allItems)
    },
    fetch: function () {
      var data = JSON.parse(localStorage.getItem(this.key) || '[]')
      return data
    },
    save: function (data) {
      localStorage.setItem(this.key, JSON.stringify(data))
    },
    itemFilter: function () {
      var tempItems = []
      for(var i in this.items){
        if(this.items[i].status == 'In queue' || (this.items[i].status == 'In progress' && this.items[i].assignee === this.receptionist.id )){
          if((this.items[i].reason == 'Private' && this.reason['Private']) ||
          (this.items[i].reason == 'Business' && this.reason['Business']) ||
          (this.items[i].reason == 'Withdrawal/Deposit' && this.reason['Withdrawal/Deposit']) ||
          (this.items[i].reason == 'Investment' && this.reason['Investment'])
          ){
            tempItems.push(this.items[i])
          }
        }
      }
      this.items = tempItems
    }
  }
}
</script>