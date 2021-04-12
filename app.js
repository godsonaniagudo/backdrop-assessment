const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8088;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const shortURLRoute = require("./routes/shortURL");
const { errorType } = require("./errors");

app.use(cors());

const getErrorCode = (errorName) => {
  return errorType[errorName];
};

mongoose.connect(
  process.env.MONGO_DB_CONNECTION_URL,
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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
