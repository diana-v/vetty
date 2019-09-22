<template>
  <div class="hello">
    <br>
    <h1>{{ msg }}
    Welcome to your personal banking site!
    </h1>
    <p>
      <br>
      Here you can register to see a specialist, see your position in the queue and estimated time until your visit. To help you save time we advise you to use our statistics page where you will see our busiest time periods.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
}
p {
  color: #2c3e50;
  font-size: 18px;
}
a {
  color: #42b983;
}
</style>