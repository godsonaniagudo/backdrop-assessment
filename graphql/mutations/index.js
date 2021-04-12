const { GraphQLObjectType, GraphQLString } = require("graphql");
const ShortURL = require("../types");

const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    shortenURL: {
      type: ShortURL,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        console.log(args);
      },
    },
  },
});

module.exports = Mutations;
