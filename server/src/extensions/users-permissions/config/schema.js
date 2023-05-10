console.log('Executing schema.js');

module.exports = {

    query: `
      user(id: ID!): UsersPermissionsUser
    `,
    resolver: {
      Query: {
        user: {
          resolver: 'plugins::users-permissions.user.findOne',
        },
      },
    },
  };
