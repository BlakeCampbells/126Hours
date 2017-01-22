<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <canvas id="myChart" width="400" height="400"></canvas>
    <button aria-hidden="true" v-on:click="update()"></button>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'There\'s 168 Hours in a week. Minus six hours of sleep a night. You are left with 126 hours, make them count.'
    }
  },
  methods: {
    update: function () {}
  },
  created: function () {
    var ctx = document.getElementById('myChart')
    var data = {
      labels: [
        'Time Passed',
        'Time Left'
      ],
      datasets: [
        {
          data: [18, 126],
          backgroundColor: [
            '#FF6384',
            '#36A2EB'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB'
          ]
        }
      ]
    }
    var myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {}
    })
    console.log(myDoughnutChart)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
