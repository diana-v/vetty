<template>
  <div class="about">
  <line-chart :data="chartData"></line-chart>
  </div>
</template>
<div id="app">
</div>

<script>
export default {
  data: function () {
    return {
      chartData: [
        { name: 'Private', data: { '08:00:00 -0800': 0, '17:00:00 -0800': 5 } },
        { name: 'Business', data: { '08:00:00 -0800': 0, '17:00:00 -0800': 7 } },
        { name: 'Withdrawal/Deposit', data: { '08:00:00 -0800': 0, '17:00:00 -0800': 3 } },
        { name: 'Investment', data: { '08:00:00 -0800': 0, '17:00:00 -0800': 4 } }
      ]
    }
  }
}
</script>
