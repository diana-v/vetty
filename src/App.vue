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
    <div  class="about" >
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
  position: fixed;
  top: 20px;
  left: 100px;
  right: 100px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}

.about {
  color: #2c3e50;
  margin: 20vh auto;
  width: 40vh;
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
</style>
