<template>
  <div class="hello">
    <div class="row">
      <div class="col s12 m10 offset-m1">
        <div class="card blue">
          <div class="card-content white-text">
            <p>{{ text.totalHours }}</p>
            <p>{{ text.timeLeft }}</p>
            <br>
            <h2>{{ time.awake.total | capitalize}}</h2>
            <h3>-</h3>
            <h4>Awake so Far: {{ (time.awake.estimate) }}</h4>
            <h4>=</h4>
            <h4>Left Awake this Week:{{ time.left.estimate }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="card blue-grey">
          <div class="card-content white-text">
            <span class="card-title">
              Customize
            </span>
            <p>
              <div class="row">
                Hours of sleep per night:
                <div class="input-field inline">
                  <input id="hours" type="number" v-model.number="hours" v-on:input="chartUpdate(hours)">
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card darken-1">
          <div class="card-content">
            <span class="card-title">Time Spent</span>
            <canvas id="myChart" width="200" height="200"></canvas>
          </div>
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
var myDoughnutChart
var intervalTimer

export default {
  name: 'hello',
  data () {
    return {
      hours: 6,
      text: {
        totalHours: 'There\'s 168 Hours in a week. Minus six hours of sleep a night.',
        timeLeft: 'You are left with 126 hours, make them count.'
      },
      time: {
        asleep: {
          estimate: this.labelTimes(this.msToTime(this.timeAsleep(6)), true),
          hours: 6
        },
        awake: {
          total: this.labelTimes(this.msToTime(this.timePassed()), true),
          estimate: this.labelTimes(this.msToTime(this.timePassed()), true)
        },
        passed: {
          total: this.labelTimes(this.msToTime(this.timePassed()), true)
        },
        left: {
          total: this.labelTimes(this.msToTime(this.timeTill()), true),
          estimate: this.labelTimes(this.msToTime(this.timeTillEstimate()), true)
        }
      },
      displayEstimateAsleep: ''
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
            backgroundColor: ['#ff0606', '#36A2EB']
          }
        ]
      }
      myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        animationSteps: 10,
        options: {
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
    labelPassed: function () {
      var self = this
      return self.labelTimes(self.timePassed())
    },
    labelTimes: function (dateTime, seconds = false) {
      var label = ''
      if (dateTime.days >= 1) {
        dateTime.hours += dateTime.days * 24
      }
      ['hours', 'minutes', 'seconds'].forEach(function (timeFrame) {
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
