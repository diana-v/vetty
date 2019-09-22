<template>
  <div>
    <h1>Reason for visit:</h1>
    <div class="reception-div">
      <input class="reception-submit" type="button" value="Private" v-on:click="addAppointment('Private')" />
      <input class="reception-submit" type="button" value="Business" v-on:click="addAppointment('Business')" />
      <input class="reception-submit" type="button" value="Withdrawal/Deposit" v-on:click="addAppointment('Withdrawal/Deposit')" />
      <input class="reception-submit" type="button" value="Investment" v-on:click="addAppointment('Investment')" />
      <input class="reception-submit" type="button" value="Clear" v-on:click="clear" />
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
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
      timeout: 5000,
      items: [],
      key: 'raktas' }
  },
  methods: {
    addAppointment: function (reason) {
      var itemStatus = 'In queue'
      var itemId = this.getNextId()
      this.text = 'Your visit for ' + reason + ' has been booked. ID:' + itemId
      this.snackbar = true
      this.save({ id: itemId,
        reason: reason,
        status: itemStatus,
        assignee: '',
        date_created: Math.floor(Date.now()),
        date_processing_start: '',
        date_processing_end: ''
      })
    },
    fetch: function () {
      var todos = JSON.parse(localStorage.getItem(this.key) || '[]')
      return todos
    },
    save: function (todos) {
      var allTodos = this.fetch()
      allTodos.push(todos)
      localStorage.setItem(this.key, JSON.stringify(allTodos))
      this.items = allTodos
    },
    clear: function () {
      localStorage.clear()
    },
    getNextId: function () {
      var allItems = this.fetch()
      if (Object.keys(allItems).length === 0) {
        return 1
      }
      return allItems[Object.keys(allItems).length - 1].id + 1
    }
  }
}
</script>
