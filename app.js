const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8099;
const graphQL = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql");
const mongoose = require("mongoose");
const shortURLRoute = require("./routes/shortURL");
const { errorType } = require("./errors");

const getErrorCode = (errorName) => {
  return errorType[errorName];
};

mongoose.connect(
  "mongodb+srv://godson:Thesmartone1!@cluster0.uoonp.gcp.mongodb.net/urlShortener?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (result) => {
    console.log(result);
  }
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    formatError: (err) => {
      const error = getErrorCode(err.message);
      return { message: error.message };
    },
  })
);

app.use("/", shortURLRoute);

app.listen(8088, () => {
  console.log("Server started on port 8099");
});
