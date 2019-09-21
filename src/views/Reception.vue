<template>
  <div>
    <h1>Reason for visit:</h1>
    <div class="reception-div">
      <input class="reception-submit" type="button" value="Private" v-on:click="addAppointment('private')" />
      <input
        class="reception-submit"
        type="button"
        value="Business"
        onClick="alert('Appointment sucessfully booked.'); return true"
      />
      <input
        class="reception-submit"
        type="button"
        value="Transactions"
        onClick="alert('Appointment sucessfully booked.'); return true"
      />
      <input
        class="reception-submit"
        type="button"
        value="Investment"
        onClick="alert('Appointment sucessfully booked.'); return true"
      />
      <input
        class="reception-submit"
        type="button"
        value="clearShit"
        v-on:click="clearShit">
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
      this.save({ id: 654, reason: reason, status: 'in queue', destination: 11 })
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
    }
  }
}
</script>
