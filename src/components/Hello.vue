<template>
  <div class="hello">
    <p>{{ msg }}</p>
    <p>Time Remaining: {{ time.left.total }}</p>
    <p>Time Passed: {{ time.passed.total }}</p>
    <p>Estimated Time Asleep: {{ time.asleep.total }}</p>
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
      msg: 'There\'s 168 Hours in a week. Minus six hours of sleep a night. You are left with 126 hours, make them count.',
      time: {
        passed: {
          total: this.labelTimes(this.msToTime(this.timePassed()), true),
          withSleep: ''
        },
        left: {
          total: this.labelTimes(this.msToTime(this.timeTill()), true),
          withSleep: ''
        },
        asleep: {
          total: this.labelTimes(this.msToTime(this.timeAsleep()), true),
          hours: 6
        },
        rightNow: this.labelTimes(this.msToTime(this.timePassed()), true),
        countdown: this.labelTimes(this.msToTime(this.timeTill()), true),
        estimateAsleep: this.labelTimes(this.msToTime(this.time), true)
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
    timeAsleep: function (hours = 6) {
      return (moment(moment().startOf('week')).countdown(moment().endOf('week')).days + 1) * hours * 60 * 60 * 1000
    },
    timeLeft: function () {
      return moment().countdown(moment().endOf('week'))
    },
    timePassed: function () {
      return moment(moment().startOf('week')).countdown(moment().utc()).value
    },
    timeTill: function () {
      return moment().countdown(moment().endOf('week')).value
    }
  },
  mounted: function () {
    var self = this
    var week = {
      time: {
        asleep: self.timeAsleep(),
        passed: self.timePassed(),
        till: self.timeTill()
      }
    }
    console.log('Week', week)
    console.log(countdown, momentCountdown)
    console.log('Time asleep', self.timeAsleep())

    var ctx = document.getElementById('myChart')
    var data = {
      labels: [
        'Estimated Time Asleep',
        'Time Awake',
        'Time Left'
      ],
      datasets: [
        {
          data: [
            week.time.asleep,
            week.time.passed,
            week.time.till
          ],
          backgroundColor: [
            '#616161',
            '#ff0606',
            '#36A2EB'
          ],
          hoverBackgroundColor: [
            '#616161',
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
      myDoughnutChart.data.datasets[0].data[1] = self.timePassed()
      myDoughnutChart.data.datasets[0].data[2] = self.timeTill()
      myDoughnutChart.update()
      self.time.passed.total = self.labelTimes(self.msToTime(self.timePassed()), true)
      self.time.left.total = self.labelTimes(self.msToTime(self.timeTill()), true)
      self.time.asleep.total = self.labelTimes(self.meToTime(self.timeAsleep()))
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
