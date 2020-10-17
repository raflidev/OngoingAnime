import cheerio from "cheerio";
import axios from "axios";
import CryptoJS from "crypto-js";

const anime = [];
export async function getUrl() {
  if (anime.length == 0) {
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
  }
  return anime;
}
