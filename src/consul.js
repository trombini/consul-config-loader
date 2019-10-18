const _ = require('lodash')

const flatJsonObjects = (objects) => _.merge(...objects)

/**
 * Replace placeholders with values from context
 */
const renderTemplateString = (templateString, context) => {
  return templateString.replace(/(\$\{[a-zA-Z.]+?\})/g, (x, match) => {
    // Filter out literal ${} from
    const matches = /\$\{([a-zA-Z.]+?)\}/.exec(match)
    if (matches && matches.length > 0) {
      const key = matches[1]
      return _.has(context, key) ? _.get(context, key) : `\${${key}}`
    }
  })
}

/**
 * Recursive function that iterates over all keys of the object and tries to resolve
 * the literal placeholders with values in the context
 * params object Object we want to process
 * params context Context to look up variables and replace placeholders
 */
const enrichConfiguration = (object, context = object) => {
  if (typeof object === 'string') {
    return renderTemplateString(object, context)
  }
  if (typeof object === 'object') {
    const newObject = { ...object }
    for (const key of Object.keys(newObject)) {
      newObject[key] = enrichConfiguration(object[key], context)
    }
    return newObject
  }
}

const processConfig = (nodes) => {
  const mergedConfiguration = flatJsonObjects(nodes)
  const processedConfiguration = enrichConfiguration(mergedConfiguration)
  return processedConfiguration
}

module.exports = {
  flatJsonObjects,
  processConfig,
  renderTemplateString
}
