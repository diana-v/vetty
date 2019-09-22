<template>
  <div id="app" >
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/reception">Reception</router-link> |
      <router-link to="/board">Board</router-link> |
      <router-link to="/specialist">Specialist</router-link> |
      <router-link to="/client">Client</router-link> |
     <router-link to="/statistics">Statistics</router-link>
    </div>
    <div class="content" >
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-image:url("https://www.jesusislife.in/wp-content/uploads/2019/05/Savin-NY-Website-Background-Web.jpg");
}

#nav {
  padding: 30px;
  font-size: 30px;
  background: teal;
  top: 20px;
  margin: 0 10vh;
  position: relative;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}

.content {
  color: #2c3e50;
  margin: 20vh auto;
  width: 80vh;
}

.reception-submit {
  font-size: xx-large;
  margin: 10px;
  width: 40vh;
  border-radius: 20px;
  background-color: teal;
}

.reception-div {

}

.table-striped {
  font-size: x-large;
  line-height: 1.6;
  border: 3px solid teal;
  border-collapse: collapse;
  padding: 60px 60px;
  text-align: left;
}

.container {
  width: 700px ;
  margin-left: auto ;
  margin-right: auto ;
  padding-top: 10%;
}

</style>
