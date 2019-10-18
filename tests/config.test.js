const chai = require('chai')
const consul = require('../src/consul')

const expect = chai.expect

test('Expression in template string should be replaced', () => {
  const templateString = 'Some string with an ${expression} to substitute'
  const context = {
    expression: 'EXPRESSION'
  }

  const result = consul.renderTemplateString(templateString, context)
  expect(result).to.equal('Some string with an EXPRESSION to substitute')
})

test('Expression is not replaced if can not be found in the context', () => {
  const templateString = 'Some string with an ${expression} to substitute'
  const context = {
    foo: 'bar'
  }

  const result = consul.renderTemplateString(templateString, context)
  expect(result).to.equal('Some string with an ${expression} to substitute')
})


test('The more specific config should overwrite the common config', () => {
  const common = {
    database: 'shoule-be-overwritten'
  }
  const specific = {
    database: 'the-real-database',
    some: {
      other: 'property'
    }
  }

  const result = consul.flatJsonObjects([ common, specific ])
  expect(result.database).to.equal('the-real-database')
  expect(result.some.other).to.equal('property')
})
