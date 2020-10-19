import cheerio from "cheerio";
import axios from "axios";
import CryptoJS from "crypto-js";

var anime = [];
export async function getUrl() {
  anime = [];
  const link = "https://otakudesu.tv/ongoing-anime/";
  const result = await axios.get(link);
  const $ = cheerio.load(result.data);
  anime.push({
    date: Date.now(),
    ongoing: [],
  });
  $(".detpost").each(function () {
    anime[0].ongoing.push({
      judul: $(this).find(".jdlflm").html(),
      tanggal: $(this).find(".newnime").html(),
      link: $(this).find("a").attr("href"),
      base: CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse($(this).find("a").attr("href"))
      ),
    });
  });
  return anime;
}

var episode = [];
export async function getListEpisode(url) {
  const result = await axios.get(url);
  const $ = cheerio.load(result.data);
  episode = [];
  $(".episodelist li").each(function () {
    if ($(this).find("a[data-wpel-link=internal]").attr("href") != undefined) {
      episode.push({
        link: $(this).find("a[data-wpel-link=internal]").attr("href"),
        judul: $(this).find("a[data-wpel-link=internal]").text(),
        tanggal: $(this).find(".zeebr").text(),
      });
    }
  });
  console.log(episode.length);
  return episode.reverse();
}
