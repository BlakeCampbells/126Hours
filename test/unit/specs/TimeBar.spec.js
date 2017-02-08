// import Vue from 'vue'
import TimeBar from 'src/components/TimeBar'
import Chart from 'chart.js'
import moment from 'moment'
import countdown from 'countdown'
import momentCountdown from 'moment-countdown'

describe('TimeBar.vue', () => {
  console.log('Dependencies', Chart, moment, countdown, momentCountdown)

  // Name
  describe('Name', () => {
    it('To be correct', () => {
      TimeBar.name.should.equal('TimeBar')
    })
  })
// ======================================================
// Mounted Testing Start
// ======================================================
  describe('Mounted', () => {
    it('To exist and call chart create', () => {
      var mounted = TimeBar.mounted
      expect(mounted).to.be.a('function')
    })
  })
// ======================================================
// Data Testing Start
// ======================================================
  describe('Data', () => {
    it('To be a function', () => {
      var data = TimeBar.data
      expect(data).to.be.a('function')
    })

    it('Hours to be 6', () => {
      var hours = TimeBar.data().hours
      expect(hours).to.be.a('number')
    })

    it('Time to be an object', () => {
      var time = TimeBar.data().time
      expect(time).to.be.an('object')
      expect(time).to.have.property('awake')
      expect(time).to.have.property('asleep')
      expect(time).to.have.property('passed')
      expect(time).to.have.property('left')
    })
  })
// ======================================================
// Method Testing Start
// ======================================================
  describe('Methods', () => {
    it('To exist', () => {
      var methods = TimeBar.methods
      expect(methods).to.be.an('object')
    })

    it('Create Chart to be a function', () => {
      var timeObj = TimeBar.methods.chartCreate
      // TimeBar.methods.chartCreate()
      expect(timeObj).to.be.a('function')
    })

    it('Update Chart to be a function', () => {
      var timeObj = TimeBar.methods.chartUpdate
      // TimeBar.methods.chartUpdate()
      expect(timeObj).to.be.a('function')
    })

    it('Time Till Estimate to return a number', () => {
      var time = TimeBar.methods.timeTillEstimate()
      expect(time).to.be.a('number')
    })

    it('msToTime to return an object with Hours/Minutes/Seconds', () => {
      var timeObj = TimeBar.methods.msToTime(12345678910)
      expect(timeObj).to.be.an('object')
      expect(timeObj).to.have.property('hours')
      expect(timeObj.hours).to.equal(501)
      expect(timeObj).to.have.property('minutes')
      expect(timeObj.minutes).to.equal(21)
      expect(timeObj).to.have.property('seconds')
      expect(timeObj.seconds).to.equal(18)
    })

    it('Label Time to return a string with Hours/Minutes/Seconds', () => {
      var label = TimeBar.methods.labelTimes(TimeBar.methods.msToTime(12345601000), true)
      expect(label).to.be.a('string')
      expect(label).to.have.string('501 hours')
      expect(label).to.have.string('20 minutes')
      expect(label).to.have.string('1 second')
    })

    it('Label Time to return a string with Hours/Minutes/Second', () => {
      var label = TimeBar.methods.labelTimes(TimeBar.methods.msToTime(12345678910), false)
      expect(label).to.be.a('string')
      expect(label).to.have.string('501 hours')
      expect(label).to.have.string('21 minutes')
    })

    it('Label Time to return a string with Hours/Minutes', () => {
      var label = TimeBar.methods.labelTimes(TimeBar.methods.msToTime(12345678910), false)
      expect(label).to.be.a('string')
      expect(label).to.have.string('501 hours')
      expect(label).to.have.string('21 minutes')
    })

    it('Time Asleep to return a number', () => {
      var time = TimeBar.methods.timeAsleep()
      expect(time).to.be.a('number')
    })

    it('Time Awake to return a number', () => {
      var time = TimeBar.methods.timeAwakeTotal()
      expect(time).to.be.a('number')
    })

    it('Time Passed to return a number', () => {
      var time = TimeBar.methods.timePassed()
      expect(time).to.be.a('number')
    })

    it('Time Till to return a number', () => {
      var time = TimeBar.methods.timeTill()
      expect(time).to.be.a('number')
    })

    it('Time Till Estimate to return a number', () => {
      var time = TimeBar.methods.timeTillEstimate()
      expect(time).to.be.a('number')
    })
  })
})
