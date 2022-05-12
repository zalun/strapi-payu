// server/content-types/sandbox-settings.js
module.exports = {
  schema: {
    kind: 'singleType',
    collectionName: 'sandbox_settings',
    info: {
      singularName: 'sandbox-settings',
      pluralName: 'sandbox-settings',
      displayName: 'PayU Settings - Sandbox',
      description: '',
    },
    pluginOptions: {
      'content-manager': { visible: true },
      'content-type-builder': { visible: false },
    },
    attributes: {
      payuAuthorizeUrl: {
        type: 'string',
        default: 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize',
      },
      payuApiUrl: {
        type: 'string',
        default: 'https://secure.snd.payu.com/api/v2_1',
      },
      clientId: { type: 'string', default: '300746' },
      clientSecret: {
        type: 'string',
        default: '2ee86a66e5d97e3fadc400c9f19b065d',
      },
      merchantPosId: { type: 'string', default: '300746' },
      notifyUrl: { type: 'string' },
    },
  },
}
