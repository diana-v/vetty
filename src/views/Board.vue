<template>
  <div class="board">
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Reason</th>
      <th scope="col">Status</th>
      <th scope="col">Destination</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for= "item in items" v-bind:key="item.id">
      <th scope="row"> {{ item.id }} </th>
      <td>{{ item.reason }}</td>
      <td>{{ item.status }}</td>
      <td>{{ item.destination }}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      key: 'raktas',
      items: []
    }
  },
  beforeMount () {
    this.items = this.fetch()
  },
  methods: {
    addAppointment: function () {
      this.save({ id: 654, reason: 'Foo', status: 'in queue', destination: 11 })
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
    }
  }
}
</script>
<style scoped>

.black {
  margin: 40px 0 0;
  background-color:#42b983;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
