// import Vue from 'vue'
import CustomFooter from 'src/CustomFooter'

describe('CustomFooter.vue', () => {
  // Name
  describe('Name', () => {
    it('To be correct', () => {
      CustomFooter.name.should.equal('CustomFooter')
    })
  })
// ======================================================
// Data Testing Start
// ======================================================
  describe('Data', () => {
    it('To be a function', () => {
      var data = CustomFooter.data
      expect(data).to.be.a('function')
    })

    it('To Contain an array of Tools Used', () => {
      var tools = CustomFooter.data().toolsUsed
      expect(tools).to.be.an('array')
      expect(tools[0]).to.have.property('label')
      expect(tools[0]).to.have.property('link')
    })

    it('To Contain an array Contact At', () => {
      var contact = CustomFooter.data().contactAt
      expect(contact).to.be.an('array')
      expect(contact[0]).to.have.property('label')
      expect(contact[0]).to.have.property('icon')
      expect(contact[0]).to.have.property('link')
    })
  })
// ======================================================
// Data Testing End
// ======================================================
})
