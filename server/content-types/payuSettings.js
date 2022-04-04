module.exports = {
  schema: {
    "kind": "singleType",
    "collectionName": "payu_settings",
    "info": {
      "singularName": "payu-settings",
      "pluralName": "payu-settings",
      "displayName": "PayU Settings",
      "description": ""
    },
    pluginOptions: {
      'content-manager': {
        visible: false
      },
      'content-type-builder': {
        visible: false
      }
    },
    "attributes": {
      "payu_authorize_url": {
        "type": "string",
        "default": "https://secure.payu.com/pl/standard/user/oauth/authorize",
        "description": "PayU Authorize URL"
      },
      "payu_api_url": {
        "type": "string",
        "default": "https://secure.payu.com/api/v2_1",
        "description": "PayU Authorize URL"
      },
      "client_id": {
        "type": "string",
        "description": "Merchant ID"
      },  
      "client_secret": {
        "type": "string",
        "description": "Merchant Secret"
      },
      "merchant_pos_id": {
        "type": "string",
        "description": "Merchant ID"
      },
      "notify_url": {
        "type": "string",
        "description": "Which URL to send webhooks to"
      }
    }
  }
}
