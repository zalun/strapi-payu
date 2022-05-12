// server/services/auth.js

const payu = require('../utils/payu')

module.exports = ({ strapi }) => ({

  async getToken(settings) {
    // Collect settings from database
    let localSettings = settings
    if (!localSettings) {
      const data = await strapi
        .plugin('payu')
        .service('settings')
        .getSettings()
      localSettings = data.settings
    }
    // Return the getToken promise
    const token = await payu.getToken(localSettings)
    return { token }
  },
})
