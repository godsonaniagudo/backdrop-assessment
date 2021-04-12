const { GraphQLSchema } = require("graphql");
const Mutations = require("./mutations");
const RootQuery = require("./queries");

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});

module.exports = schema;
