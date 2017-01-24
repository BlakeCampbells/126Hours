<template>
  <div class="hello">
    <p>{{ msg }}</p>
    <p>{{ timeLeftThisWeek }}</p>
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
      timeLeftThisWeek: this.timeLeftFormatted()
    }
  },
  methods: {
    update: function () {},
    msToTime: function (ms) {
      var tempTime = moment.duration(ms)
      var dateTime = {
        days: tempTime.days(),
        hours: tempTime.hours(),
        minutes: tempTime.minutes(),
        seconds: tempTime.seconds()
      }
      return dateTime
    },
    labelTimes: function (dateTime) {
      var label = ''
      if (dateTime.days > 1) {
        label += dateTime.days + ' days'
      } else if (dateTime.days === 1) {
        label += dateTime.days + ' day'
      }

      if (dateTime.hours > 1) {
        label += ' ' + dateTime.hours + ' hours'
      } else if (dateTime.hours === 1) {
        label += ' ' + dateTime.hours + ' hour'
      }

      if (dateTime.minutes > 1) {
        label += ' ' + dateTime.minutes + ' minutes'
      } else if (dateTime.minutes === 1) {
        label += ' ' + dateTime.minutes + ' minute'
      }

      return label
    },
    timeLeftFormatted: function () {
      var timeObj = moment().countdown(moment().endOf('week'))
      var label = this.labelTimes(timeObj)

      if (timeObj.seconds !== 1) {
        label += ' ' + timeObj.seconds + ' seconds'
      } else {
        label += ' ' + timeObj.seconds + ' second'
      }
      return label
    },
    timePassed: function () {
      return moment(moment().startOf('week')).countdown(moment().utc()).value - this.timeAsleep()
    },
    timeTill: function () {
      return moment().countdown(moment().endOf('week')).value
    },
    timeAsleep: function () {
      return moment(moment().startOf('week')).countdown(moment().utc().add(1, 'day')).days * 6 * 60 * 60 * 1000
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
        'Time Asleep',
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
      self.timeLeftThisWeek = self.timeLeftFormatted()
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
