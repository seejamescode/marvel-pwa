const api = require("marvel-api");

const marvel = api.createClient({
  publicKey: process.env.MARVEL_KEY_PUBLIC,
  privateKey: process.env.MARVEL_KEY_PRIVATE
});

export default (req, res) => {
  const {
    query: { search }
  } = req;

  marvel.characters
    .findNameStartsWith(search)
    .then(function(response) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify(response.data));
    })
    .fail(function(res) {
      console.error;
      res.statusCode = 500;
      res.end();
    })
    .done();
};
