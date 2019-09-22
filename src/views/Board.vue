<template>
  <div class="board">
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'reason', value: 'reason' },
        { text: 'status', value: 'status' },
        { text: 'destination', value: 'destination' },
        { text: 'created', value: 'date_created' },
        { text: 'started', value: 'date_processing_start' },
        { text: 'finished', value: 'date_processing_end' }
      ],
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
      this.itemSort()
      this.process()
      setTimeout(() => {this.timeoutLoop()}, 1000)
    },
    fetch: function () {
      var todos = JSON.parse(localStorage.getItem(this.key) || '[]')
      return todos
    },
    itemSort: function () {
      this.items = this.items.sort((a, b)=>{
        let comparison = 0;
        if (a.reason > b.reason) {
          comparison = 1;
        } else if (a.reason < b.reason) {
          comparison = -1;
        }
        return comparison;      
      }) 
    },
    process: function () {
      var ts
      for( var i in this.items ) {
        if(this.items[i].date_created){
          ts = new Date(this.items[i].date_created );
          this.items[i].date_created = ts.toLocaleTimeString()
        }
        if(this.items[i].date_processing_start){
          ts = new Date(this.items[i].date_processing_start );
          this.items[i].date_processing_start = ts.toLocaleTimeString()
        }
        if(this.items[i].date_processing_end){
          ts = new Date(this.items[i].date_processing_end );
          this.items[i].date_processing_end = ts.toLocaleTimeString()
        }
      }
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
