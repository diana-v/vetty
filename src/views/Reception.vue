<template>
  <div>
    <h1>Reason for visit:</h1>
    <div class="reception-div">
      <input class="reception-submit" type="button" value="Private" v-on:click="addAppointment('Private')" />
      <input class="reception-submit" type="button" value="Business" v-on:click="addAppointment('Business')" />
      <input class="reception-submit" type="button" value="Withdrawal/Deposit" v-on:click="addAppointment('Withdrawal/Deposit')" />
      <input class="reception-submit" type="button" value="Investment" v-on:click="addAppointment('Investment')" />
      <input class="reception-submit" type="button" value="Clear shit" v-on:click="clearShit" />
    </div>
    <div id="example-1">
      <li
        v-for="item in items"
        v-bind:key="item.message"
      >{{ item.status }}</li>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      items: [],
      key: 'raktas' }
  },
  methods: {
    addAppointment: function (reason) {
      alert('Your appointment is booked for: ' + reason)
      var itemStatus = 'in queue'
      if (reason === 'Private') {
        itemStatus = 'cancelled'
      }
      var itemId = this.getNextId()
      this.save({ id: itemId,
        reason: reason,
        status: itemStatus,
        destination: ''
      })
      console.log(this.fetch())
    },
    fetch: function () {
      var todos = JSON.parse(localStorage.getItem(this.key) || '[]')
      return todos
    },
    save: function (todos) {
      var allTodos = this.fetch()
      console.log(allTodos)
      allTodos.push(todos)
      localStorage.setItem(this.key, JSON.stringify(allTodos))
      this.items = allTodos
    },
    clearShit: function () {
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
