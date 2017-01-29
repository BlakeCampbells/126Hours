<template>
  <div id="app">
    <time-tracking></time-tracking>
  </div>
</template>

<script>
import TimeTracking from './components/TimeTracking'

export default {
  name: 'app',
  components: {
    TimeTracking
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
