<template>
  <div id="app">
    <nav>
      <router-link to="#"><img src="../src/assets/Henylogo.png" alt="logo"></router-link>
      <div class="links">
      <router-link to="/">Places List</router-link> 
      <router-link to="/create">Create New Place</router-link> 
    </div>
    
    </nav>

    <router-view /> 
  </div>
</template>

<script>
import router from './router';
export default {
  name: 'App',
  router
};
</script>

<style scoped>
.links{
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 12px;
}
nav {
  padding: 0px;
  height: 5rem;
  background-color: transparent;
  color: black;
  font-family: "Roboto",sans-serif !important;
  display:flex; 
  justify-content: space-between;
}

a {
  color: black;
  text-decoration: none;
  font-weight: bold;

}

a:hover {
color: #fbbb3d;
}
</style>
