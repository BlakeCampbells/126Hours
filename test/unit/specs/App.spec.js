// import Vue from 'vue'
import App from 'src/App'

describe('App.vue', () => {
  // Name
  describe('Name', () => {
    it('To be correct', () => {
      App.name.should.equal('App')
    })
  })
// ======================================================
// Data Testing Start
// ======================================================
  describe('Data', () => {
    it('To be a function', () => {
      var data = App.data
      expect(data).to.be.a('function')
    })

    it('Navbar to be an array', () => {
      var tools = App.data().navbar
      expect(tools).to.be.an('array')
      expect(tools[0]).to.have.property('name')
      expect(tools[0]).to.have.property('link')
    })
  })
// ======================================================
// Data Testing End
// ======================================================
})
