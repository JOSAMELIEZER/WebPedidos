<template>
  <div id="app">
    <div class="container">
      <img src="@/assets/baners.jpg" alt="" id="banner">
      <b-card title="Card Title" no-body>
        <b-card-header header-tag="nav">
          <menu-pub></menu-pub>
        </b-card-header>

        <b-card-body>
          <!-- Child route gets rendered in <router-view> or <nuxt-child> -->
          <router-view></router-view>
          <!-- Or if using Nuxt.js
      <nuxt-child></nuxt-child>
      -->
        </b-card-body>
      </b-card>
    </div>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
  </div>
</template>

<script>
  import MenuPub from '@/components/MenuPub.vue'
  export default {
    components:{
      MenuPub
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
#banner{
  width: 100%;
}
</style>
