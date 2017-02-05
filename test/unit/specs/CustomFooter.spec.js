// import Vue from 'vue'
import CustomFooter from 'src/CustomFooter'

describe('CustomFooter.vue', () => {
  // Name
  it('Component to have the correct name', () => {
    CustomFooter.name.should.equal('CustomFooter')
  })

// ======================================================
// Data Testing Start
// ======================================================
  it('Data to be a function', () => {
    var data = CustomFooter.data
    expect(data).to.be.a('function')
  })

  it('Tools Used to be an array', () => {
    var tools = CustomFooter.data().toolsUsed
    expect(tools).to.be.an('array')
    expect(tools[0]).to.have.property('label')
    expect(tools[0]).to.have.property('link')
  })

  it('Contact At to be an array', () => {
    var contact = CustomFooter.data().contactAt
    expect(contact).to.be.an('array')
    expect(contact[0]).to.have.property('label')
    expect(contact[0]).to.have.property('icon')
    expect(contact[0]).to.have.property('link')
  })
// ======================================================
// Data Testing End
// ======================================================
})
