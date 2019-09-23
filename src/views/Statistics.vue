<template>
  <div class="statistics">
  <line-chart :data="chartData"></line-chart>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      chartData: [
        { name: 'Private', data: { '08:00:00 -0800': 0, '17:00:00 -0800': 5 } },
        { name: 'Business', data: { '08:00:00 -0800': 0, '17:00:00 -0800': 7 } },
        { name: 'Withdrawal/Deposit', data: { '08:00:00 -0800': 0, '17:00:00 -0800': 3 } },
        { name: 'Investment', data: { '08:00:00 -0800': 0, '17:00:00 -0800': 4 } }
      ],
      reason: {
        'Private': true,
        'Withdrawal/Deposit': true,
        'Business': true,
        'Investment': true
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
      setTimeout(() => {this.timeoutLoop()}, 5000)
    },
    fetch: function () {
      var data = JSON.parse(localStorage.getItem(this.key) || '[]')
      return data
    },
    itemFilter: function () {
      var chartData = []

      //working hours data filter
      for(var reason in this.reason) {
        var reasonObj = {name: reason, data: {}}

          for(var i in this.items){
            if(this.items[i].reason == reason ) {              
              var ts = new Date(this.items[i].date_created);
              var hours = ts.getHours()

              if (typeof reasonObj.data[hours + ':00:00'] === 'undefined') {
                reasonObj.data[hours + ':00:00']=1
              } else {
                reasonObj.data[hours + ':00:00']=1 + reasonObj.data[hours + ':00:00']
              }
            }
        }
        chartData.push(reasonObj)
      }

      this.chartData = chartData
    }
  }
}
</script>
