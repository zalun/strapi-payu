// server/content-types/production-settings.js
module.exports = {
  schema: {
    kind: "singleType",
    collectionName: "production_settings",
    info: {
      singularName: "production-settings",
      pluralName: "production-settings",
      displayName: "PayU Settings - Production",
      description: ""
    },
    pluginOptions: {
      'content-manager': {  visible: true },
      'content-type-builder': { visible: false }
    },
    attributes: {
      payuAuthorizeUrl: {
        type: "string",
        default: "https://secure.payu.com/pl/standard/user/oauth/authorize",
      },
      payuApiUrl: {
        type: "string",
        default: "https://secure.payu.com/api/v2_1",
      },
      clientId: { type: "string" },  
      clientSecret: { type: "string" },
      merchantPosId: { type: "string" },
      notifyUrl: { type: "string" }
    }
  }
}
