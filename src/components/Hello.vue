<template>
  <div class="hello">
    <div class="row">
      <div class="col s12 m10 offset-m1">
        <div class="card blue">
          <div class="card-content white-text">
            <p>{{ text.totalHours }}</p>
            <p>{{ text.timeLeft }}</p>
            <br>
            <h2>126 Hours</h2>
            <h3>-</h3>
            <h4>Awake so Far: {{ (time.awake.estimate) }}</h4>
            <h4>=</h4>
            <h4>Left Awake this Week:{{ time.left.estimate }}</h4>
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

export default {
  name: 'hello',
  data () {
    return {
      text: {
        totalHours: 'There\'s 168 Hours in a week. Minus six hours of sleep a night.',
        timeLeft: 'You are left with 126 hours, make them count.'
      },
      time: {
        asleep: {
          estimate: this.labelTimes(this.msToTime(this.timeAsleep(6)), true),
          total: this.labelTimes(this.msToTime(this.timeAsleepTotal(6)), true),
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
    timeAsleepTotal: function (hours = 6) {
      return 7 * hours * 60 * 60 * 1000
    },
    timeAsleep: function (hours = 6) {
      var timeAsleep = hours * 60 * 60 * 1000 * (moment(moment().startOf('week')).countdown(moment().utc()).days + 1)
      return timeAsleep
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
    },
    estimateAsleep: function (hours = 6) {
      return (moment(moment().utc()).countdown(moment().endOf('week')).days + 1) * hours * 60 * 60 * 1000
    }
  },
  mounted: function () {
    var self = this
    console.log(countdown, momentCountdown)
    console.log('Time asleep', self.timeAsleep())

    var ctx = document.getElementById('myChart')
    var data = {
      labels: [
        'Time Awake',
        'Time Left'
      ],
      datasets: [
        {
          data: [
            1,
            1
          ],
          backgroundColor: [
            '#ff0606',
            '#36A2EB'
          ],
          hoverBackgroundColor: [
            '#ff0606',
            '#36A2EB'
          ]
        }
      ]
    }
    var myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      animationStaps: 10,
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
    setInterval(function () {
      self.time.awake.estimate = self.labelTimes(self.msToTime(self.timePassed() - self.timeAsleep(6)), true)
      self.time.left.estimate = self.labelTimes(self.msToTime(self.timeTillEstimate()), true)
      self.time.asleep.estimate = self.labelTimes(self.msToTime(self.timeAsleep(6)), true)

      myDoughnutChart.data.datasets[0].data[0] = (self.timePassed() - self.timeAsleep(6))
      myDoughnutChart.data.datasets[0].data[1] = self.timeTillEstimate()
      myDoughnutChart.update()
    }, 1000)
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
