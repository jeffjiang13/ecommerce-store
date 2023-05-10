console.log('Executing User.js findOne');

module.exports = {
    async findOne(ctx) {
      const { id } = ctx.params;
      const user = await strapi.plugins['users-permissions'].services.user.fetch({
        id,
      });

      if (!user) {
        return ctx.notFound('User not found');
      }

      // Remove sensitive data
      user.password = undefined;
      user.resetPasswordToken = undefined;

      // Populate profileImage
      const populatedUser = await strapi.plugins.upload.services.upload.populate([user], {
        model: 'plugins::users-permissions.user',
      });

      return populatedUser[0];
    },
  };
