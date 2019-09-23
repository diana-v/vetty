<template>
  <div class="board">
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :sort-by="['destination']"
      :sort-desc="[true, false]"
      class="elevation-1"
    >
      <template v-slot:item.status="{ item }">
        <v-chip :dark="getColor(item.status)">{{ item.status }}</v-chip>
    </template>
    </v-data-table>
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
        { text: 'REASON', value: 'reason' },
        { text: 'STATUS', value: 'status' },
        { text: 'DESTINATION', value: 'destination' },
      /* { text: 'CREATED', value: 'date_created' },
         { text: 'STARTED', value: 'date_processing_start' },
         { text: 'FINISHED', value: 'date_processing_end' }
      */
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
    getColor: function (status) {
      if (status === 'In progress') {
        return true
      }
      return false

    },
    timeoutLoop: function () {
      this.items = this.fetch()
      this.itemFilter()
      this.itemSort()
      this.process()
      setTimeout(() => {this.timeoutLoop()}, 1000)
    },
    fetch: function () {
      var data = JSON.parse(localStorage.getItem(this.key) || '[]')
      return data
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
    itemFilter: function () {
      var newitems = []
      for( var i in this.items ) {
        if( this.items[i].status !=='Complete') {
          newitems.push (this.items[i])
        }
      } 

      this.items = newitems
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