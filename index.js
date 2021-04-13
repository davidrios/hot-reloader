const loaderUtils = require("loader-utils");

const loaderApi = () => {};

loaderApi.pitch = function loader(request) {
  const resourcePath = JSON.stringify(this.resourcePath)

  return `
import content from ${loaderUtils.stringifyRequest(
  this,
  `!!${request}`
)}

let onUpdate = null
let onError = null

if (module.hot) {
  const resourcePath = ${resourcePath}
  module.hot.accept(
    ${loaderUtils.stringifyRequest(this, `!!${request}`)},
    function () {
      if (onUpdate == null) {
        console.warn(\`Received updated "\${resourcePath}" but there's no callback registered to handle it.\`)
        module.hot.invalidate()
        return
      }

      onUpdate(content)
    },
    function (err, params) {
      if (onError == null) {
        console.warn(\`There was an error loading "\${resourcePath}" but there's no callback registered to handle it.\`)
        return
      }

      onError(err, params)
    }
  )

  module.hot.dispose(function () {
    if (onUpdate != null) {
      onUpdate(null)
    }
  })
}

export default {
  content,
  register (updateCallback, errorCallback) {
    onUpdate = updateCallback
    onError = errorCallback
  }
}
`;
}

module.exports = loaderApi