<template>
  <v-expansion-panels>
    <v-row justify="space-around">

      <v-checkbox v-model="reason.Private" label="Private"></v-checkbox>
      <v-checkbox v-model="reason.Business" label="Business"></v-checkbox>
      <v-checkbox v-model="reason['Withdrawal/Deposit']" label="Withdrawal/Deposit"></v-checkbox>
      <v-checkbox v-model="reason.Investment" label="Investment"></v-checkbox>
    </v-row>
    <v-expansion-panel
      v-for="item in items"
      :key="item.id"
    >
      <v-expansion-panel-header> {{item.id}} - {{item.reason}}

    <template v-if="item.assignee == receptionist.id">
      <v-btn v-on:click="complete(item.id)">Complete</v-btn>
    </template>
    <template v-else>
      <v-btn v-on:click="assignToMe(item.id)">Assign to me</v-btn>
    </template>
      </v-expansion-panel-header>
      <!-- <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content> -->
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  data: function () {
    return {
      reason: {
        'Private': true,
        'Withdrawal/Deposit': true,
        'Business': true,
        'Investment': true
      },
      receptionist: {
        id: '666',
        name: 'Karen',
        room: '13'
      },
      key: 'raktas',
      items: [],
      timeout: null
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
      var todos = JSON.parse(localStorage.getItem(this.key) || '[]')
      return todos
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