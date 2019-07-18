const fetch = require("isomorphic-unfetch");

export default async (req, res) => {
  const {
    query: { path }
  } = req;

  const response = await fetch(path);

  // Cache on Zeit CDN for one month
  res.setHeader("Cache-Control", "s-maxage=31536000, max-age=0");
  res.send(response.body);
};
