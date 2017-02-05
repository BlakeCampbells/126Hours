<template>
  <div class="row TimeBar">
    <div class="blue-grey col s3">
      <!-- Grey navigation panel -->
      <div class="white-text">
        <p>There's 168 Hours in a week. Minus {{ hours }} hours of sleep a night.</p>
        <p>You are left with {{ time.awake.total }}, make them count.</p>
        <br>
        <h2>{{ time.awake.total }}</h2>
        <h3>-</h3>
        Awake so Far:<h4>{{ (time.awake.estimate) }}</h4>
        <h4>=</h4>
        Left Awake this Week:<h4>{{ time.left.estimate }}</h4>
      </div>
      <br>
      <hr>
      <br>
      <div class="white-text">
        <span>
          Customize
        </span>
        <p>
          <div class="row">
            Hours of sleep per night: {{ hours }}
            <p class="range-field col s12 m8 offset-m2">
              <input type="range" id="test5" min="0" max="23" v-model.number="hours" v-on:input="chartUpdate(hours)"/>
            </p>
          </div>
        </p>
      </div>
    </div>

    <div class="col s9">
      <div class="white">
        <div>
          <span>Time Spent</span>
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import moment from 'moment'
import countdown from 'countdown'
import momentCountdown from 'moment-countdown'
// I don't like global variables, but these are limited to this component
var myDoughnutChart
var intervalTimer

export default {
  name: 'TimeBar',
  data () {
    return {
      hours: 6,
      time: {
        asleep: {
          estimate: 0,
          hours: 6
        },
        awake: {
          total: 0,
          estimate: 0
        },
        passed: {
          total: 0
        },
        left: {
          total: 0,
          estimate: 0
        }
      }
    }
  },
  methods: {
    chartCreate: function () {
      var self = this
      console.log(countdown, momentCountdown)

      var ctx = document.getElementById('myChart')
      var data = {
        labels: ['Time Awake', 'Time Left Awake'],
        datasets: [
          {
            data: [1, 1],
            backgroundColor: ['#ff0606', '#0D47A1']
          }
        ]
      }
      myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        animationSteps: 10,
        options: {
          legend: {
            labels: {
              fontColor: 'black',
              fontSize: 18
            }
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var dateTime = self.msToTime(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])
                var dateLabel = self.labelTimes(dateTime)
                var label = data.labels[tooltipItem.index]
                return label + ': ' + dateLabel
              }
            }
          }
        }
      })
      console.log(myDoughnutChart)
      self.chartUpdate(6)
    },
    chartUpdate: function (hours = 6) {
      var self = this
      var reloadedEstimates = {
        asleep: '',
        awake: '',
        total: ''
      }
      self.time.awake.total = self.labelTimes(self.msToTime(self.timeAwakeTotal(hours)), true)
      clearInterval(intervalTimer)
      intervalTimer = setInterval(function () {
        reloadedEstimates = {
          asleep: self.timeAsleep(hours),
          awake: self.timePassed() - self.timeAsleep(hours),
          left: self.timeTillEstimate(hours)
        }
        self.time.awake.estimate = self.labelTimes(self.msToTime(reloadedEstimates.awake), true)
        self.time.left.estimate = self.labelTimes(self.msToTime(reloadedEstimates.left), true)
        self.time.asleep.estimate = self.labelTimes(self.msToTime(reloadedEstimates.asleep), true)

        myDoughnutChart.data.datasets[0].data[0] = reloadedEstimates.awake
        myDoughnutChart.data.datasets[0].data[1] = reloadedEstimates.left
        myDoughnutChart.update()
      }, 1000)
    },
    msToTime: function (ms) {
      var tempTime = moment.duration(ms)
      var dateTime = {
        hours: (tempTime.days() * 24) + tempTime.hours(),
        minutes: tempTime.minutes(),
        seconds: tempTime.seconds()
      }
      return dateTime
    },
    labelTimes: function (dateTime, seconds = false) {
      var label = ''
      var timeframes = ['hours', 'minutes', 'seconds']
      timeframes.forEach(function (timeFrame) {
        if (seconds || timeFrame !== 'seconds') {
          if (dateTime[timeFrame] > 1) {
            label += ' ' + dateTime[timeFrame] + ' ' + timeFrame
          } else if (dateTime[timeFrame] === 1) {
            label += ' ' + dateTime[timeFrame] + ' ' + timeFrame.slice(0, -1)
          }
        }
      })
      return label
    },
    timeAsleep: function (hours = 6) {
      var timeAsleep = hours * 60 * 60 * 1000 * (moment(moment().startOf('week')).countdown(moment().utc()).days + 1)
      return timeAsleep
    },
    timeAwakeTotal: function (hours = 6) {
      var sleepLeft = (moment(moment().startOf('week')).countdown(moment().endOf('week')).days * (24 - hours) * 60 * 60 * 1000)
      return sleepLeft
    },
    timePassed: function () {
      return moment(moment().startOf('week')).countdown(moment().utc()).value
    },
    timeTill: function () {
      return moment().countdown(moment().endOf('week')).value
    },
    timeTillEstimate: function (hours = 6) {
      var timeLeft = moment().countdown(moment().endOf('week')).value
      var sleepLeft = (moment().countdown(moment().endOf('week')).days * hours * 60 * 60 * 1000)
      return timeLeft - sleepLeft
    }
  },
  mounted: function () {
    this.chartCreate()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h3, h4, h5 {
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

.card {
  position: relative;
  background-color: #fff;
  transition: box-shadow .25s;
  border-radius: 2px;
}

a {
  color: #42b983;
}

.row .col{
  padding: 0 !important;
}
</style>
