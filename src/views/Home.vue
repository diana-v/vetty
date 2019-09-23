<template>
  <div class="hello">
    <br>
    <h1>
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
  data: function () {
    return {
      items: [],
      key: 'raktas',
    }  
  },
  beforeMount () {
    this.items = this.fetch()
    this.save()
  },
  methods:{
    fetch: function () {
      var data = JSON.parse(localStorage.getItem(this.key) || this.fetchDummyData())
      return data
    },
     fetchDummyData: function () {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/data.json", false)
        xhttp.send();
        return xhttp.responseText
    },
    save: function () {
      localStorage.setItem(this.key, JSON.stringify(this.items))
    },
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