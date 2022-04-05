// server/services/auth.js
'use strict';
const payu = require("../utils/payu");

module.exports = ({ strapi }) => ({

  async getToken(settings) {
    // Collect settings from database
    if (!settings) {
      data = await strapi
        .plugin('payu')
        .service('settings')
        .getSettings();
      settings = data.settings
    }
    // Return the getToken promise
    const token = await payu.getToken(settings);
    return { token };
  }
});
