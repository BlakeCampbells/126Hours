<template>

  <div id="app">
    <div>
      <nav>
        <div class="nav-wrapper blue darken-4 left-align">
          <a class="brand-logo padding">126 Hours</a>
          <ul id="nav-mobile" class="right hide-on-sm-and-down" v-for="(navItem, indx) in navbar">
            <li><a :href="navItem.link" target="_blank">{{ navItem.name }}</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <time-bar></time-bar>
    <time-tracking></time-tracking>
  </div>
</template>

<script>
import TimeBar from './components/TimeBar'

export default {
  name: 'App',
  components: {
    TimeBar
  },
  data () {
    return {
      navbar: [
        {
          name: 'Code',
          link: 'https://github.com/BlakeCampbells/126Hours'
        }
      ]
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
nav .brand-logo{
  position: absolute;
  color: #fff;
  display: inline-block;
  font-size: 2.1rem;
  padding-left: 1em !important;
  white-space: nowrap;
}
</style>
