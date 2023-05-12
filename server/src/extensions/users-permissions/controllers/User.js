console.log('Executing User.js findOne');

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: "No authorization header was found" }] }]);
    }

    const data = await strapi.plugins["users-permissions"].services.user.fetch({
      id: user.id,
    });

    ctx.send(sanitizeEntity(data, { model: strapi.query("user", "users-permissions").model }));
  },
};
