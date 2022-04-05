// server/bootstrap.js
'use strict';

module.exports = async ({ strapi }) => {
  // bootstrap phase
  const configurationCollection = await strapi.query('plugin::payu.configuration')
  const configuration = await configurationCollection.findOne();

  if (!configuration) {
    strapi.log.info("Create default PayU configuration");
    // first use of the plugin
    await configurationCollection.create({
      data: { mode: "sandbox" }
    });
  }
  if (!["sandbox", "production"].includes(configuration.mode)) {
    // some update in the schema
    strapi.log.warn("Force update to default PayU configuration", configurationCollection);
    // first use of the plugin
    await configurationCollection.update({
      where: { id: configuration.id },
      data: { mode: "sandbox" }
    });
  }

}
