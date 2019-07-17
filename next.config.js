require("dotenv").config();

// Progressive Web App: Add service worker with network-first strategy.
// Network-first strategy means that if there is no internet connection,
// the browser will use files previously saved locally to the user’s device instead.
// AKA Offline Mode!
const Dotenv = require("dotenv-webpack");
const path = require("path");
const withOffline = require("next-offline");

const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  target: "serverless",
  webpack: function(config) {
    if (isDev) {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,
        new Dotenv({
          path: path.join(__dirname, ".env"),
          systemvars: true
        })
      ];
    }

    return config;
  },
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "networkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};

module.exports = withOffline(nextConfig);
