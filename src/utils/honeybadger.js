import HoneyBadger from "@honeybadger-io/js";

HoneyBadger.configure({
  apiKey: "391861b6",
  revision: process.env.REVIEW_ID,
  assetsUrl: process.env.DEPLOY_URL,
});
