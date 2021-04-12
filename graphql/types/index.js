const { GraphQLObjectType, GraphQLString } = require("graphql");

const ShortURL = new GraphQLObjectType({
  name: "ShortURLType",
  fields: {
    longURL: {
      type: GraphQLString,
    },
    shortURL: {
      type: GraphQLString,
    },
  },
});

module.exports = ShortURL;
