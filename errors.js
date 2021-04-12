exports.errorName = {
  EMPTY: "EMPTY",
  NO_SCHEME: "NO_SCHEME",
  INVALID: "INVALID",
};

exports.errorType = {
  EMPTY: {
    message: "The url you entered is empty",
  },
  NO_SCHEME: {
    message: "The url you entered is missing a URL scheme (http/https).",
  },
  INVALID: {
    message: "The url you entered is invalid.",
  },
};
