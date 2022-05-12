// server/services/settings.js

// const payu = require('../utils/payu')

module.exports = ({ strapi }) => ({

  async getSettings() {
    // Collect settings from database
    const configuration = await strapi
      .query('plugin::payu.configuration')
      .findOne()
    const collectionName = `${configuration.mode}-settings`
    strapi.log.info('PayU configuration mode: ', configuration.mode)
    const settings = await strapi
      .query(`plugin::payu.${collectionName}`)
      .findOne()

    // Validate settings
    if (
      !settings
      || !settings.clientId
      || !settings.clientSecret
      || !settings.payuAuthorizeUrl
    ) {
      throw Error(`No PayU settings found for ${collectionName}`)
    }

    return { configuration, settings }
  },
})
