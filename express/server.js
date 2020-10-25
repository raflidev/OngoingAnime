import { getUrl, getListEpisode, getWatch } from "../scrapping";
import express from "express";
import CryptoJS from "crypto-js";
import bodyParser from "body-parser";
import serverless from "serverless-http";

const app = express();
const port = 3000;
app.set("view engine", "ejs");

async function main() {
  const result = await getUrl();
  return result;
}
app.get("/", async (req, res) => {
  const tampilData = await main();
  res.json(tampilData);
});

app.get("/home", async (req, res) => {
  const tampilData = await main();
  res.render("home", {
    anime: tampilData,
  });
});

app.get("/episode/:base", async (req, res) => {
  const tampilEpisode = await getListEpisode(
    CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(req.params.base))
  );
  res.render("episode", {
    episode: tampilEpisode,
  });
});

app.get("/nonton/:base", async (req, res) => {
  const tampilNonton = await getWatch(
    CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(req.params.base))
  );
  res.render("nonton", {
    nonton: tampilNonton,
  });
});
app.use(bodyParser.json());
module.exports = app;
module.exports.handler = serverless(app);
