// server/content-types/configuration.js
module.exports = {
  schema: {
    kind: "singleType",
    collectionName: "configuration",
    info: {
      singularName: "configuration",
      pluralName: "configurations",
      displayName: "PayU Configuration",
      description: ""
    },
    pluginOptions: {
      'content-manager': {  visible: true },
      'content-type-builder': { visible: false }
    },
    attributes: {
      mode: {
        type: "enumeration",
        enum: [
          "sandbox",
          "production",
        ],
        default: "sandbox",
      },
    }
  }
}
