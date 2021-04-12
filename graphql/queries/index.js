const { GraphQLObjectType, GraphQLString } = require("graphql");
const ShortURL = require("../types");
const ShortURLModel = require("../../models/shortUrl");
const { errorName } = require("../../errors");
const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    shortenURL: {
      type: ShortURL,
      args: { url: { type: GraphQLString } },
      async resolve(parent, args, request) {
        console.log(args);
        if (args.url === null || args.url === "") {
          throw new Error(errorName.EMPTY);
        }

        if (
          !String(args.url).toLowerCase().startsWith("http://") &&
          !String(args.url).toLowerCase().startsWith("https://")
        ) {
          throw new Error(errorName.NO_SCHEME);
        }

        if (!urlRegex.test(args.url)) {
          console.log("not valid");
          throw new Error(errorName.INVALID);
        }

        const newShortURL = new ShortURLModel({
          longURL: args.url,
        });

        try {
          const savedShortURL = await newShortURL.save();
          return {
            status: 200,
            shortURL: `${request.headers.host}/${savedShortURL.shortURL}`,
          };
        } catch (error) {
          throw error.message;
        }
      },
    },
  },
});

module.exports = RootQuery;
