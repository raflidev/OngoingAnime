import { getUrl, getListEpisode, getWatch } from "./scrapping";
import express from "express";
import CryptoJS from "crypto-js";

const app = express();
const port = 3000;
app.set("view engine", "ejs");

// var textString = "rafli"; // Utf8-encoded string
// var words = CryptoJS.enc.Utf8.parse(textString); // WordArray object
// var base64 = CryptoJS.enc.Base64.stringify(words); // string: 'SGVsbG8gd29ybGQ='
// console.log(base64);

// var text = CryptoJS.enc.Utf8.stringify(words); // 'Hello world'
// console.log(text);
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

app.listen(port, () => {
  console.log(`Aplikasi jalan di port http://localhost:${port}`);
});
