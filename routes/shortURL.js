const router = require("express").Router();
const ShortURLModel = require("../models/shortUrl");

router.get("/:url", async (req, res) => {
  try {
    const savedURL = await ShortURLModel.findOne({ shortURL: req.params.url });
    res.redirect(savedURL.longURL);
  } catch (error) {
    res
      .status(404)
      .send({
        error: { title: "Not found", message: "Could not find this url" },
      });
  }
});

module.exports = router;
