// import Vue from 'vue'
import TimeBar from 'src/components/TimeBar'
import Chart from 'chart.js'
import moment from 'moment'
import countdown from 'countdown'
import momentCountdown from 'moment-countdown'

describe('TimeBar.vue', () => {
  console.log('Dependencies', Chart, moment, countdown, momentCountdown)

  // Name
  it('Component to have the correct name', () => {
    TimeBar.name.should.equal('TimeBar')
  })

// ======================================================
// Method Testing Start
// ======================================================
  it('Create Chart to be a function', () => {
    var timeObj = TimeBar.methods.chartCreate
    expect(timeObj).to.be.a('function')
  })

  it('Time Till Estimate to return a number', () => {
    var time = TimeBar.methods.timeTillEstimate()
    expect(time).to.be.a('number')
  })

  it('Update Chart to be a function', () => {
    var timeObj = TimeBar.methods.chartUpdate
    expect(timeObj).to.be.a('function')
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
// ======================================================
// Method Testing End
// ======================================================
})
