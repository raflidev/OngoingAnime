<template>
  <div class="container">
    <div v-if="animeShow" class="d-flex flex-wrap justify-content-around">
      <div v-for="anime in anime[0].ongoing" :key="anime.index">
        <div class="card mb-4" style="width: 14rem;">
          <router-link :to="'/episode/' + anime.base" class="stretched-link"
            ><img :src="anime.gambar" class="card-img-top"
          /></router-link>
          <div class="card-body" style="height: 10rem;">
            <h5 class="card-title text-bold">{{ anime.judul }}</h5>
          </div>
        </div>
      </div>
    </div>
    <div v-else class=" d-flex justify-content-center align-self-center ">
      <div class="text-center mt-5 pt-5">
        <img
          src="https://media.tenor.com/images/419e2dc6af7df93edf9455274b24a1cb/tenor.gif"
          alt=""
          srcset=""
        />
        <p>
          <i>loading bang...</i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import cheerio from "cheerio";
import CryptoJS from "crypto-js";
export default {
  name: "Home",
  data() {
    return {
      animeShow: false,
      anime: [],
    };
  },
  mounted() {
    axios
      .get("https://otakudesu.tv/ongoing-anime/", {
        crossDomain: true,
      })
      .then((response) => {
        this.anime = [];
        this.anime.push({
          date: Date.now(),
          ongoing: [],
        });
        const $ = cheerio.load(response.data);
        $(".detpost").each((res) => {
          this.anime[0].ongoing.push({
            judul: $(".detpost").find(".jdlflm")[res].children[0].data,
            tanggal: $(".detpost").find(".newnime")[res].children[0].data,
            link: $(".detpost").find("a")[res].children[0].parent.attribs.href,
            base: CryptoJS.enc.Base64.stringify(
              CryptoJS.enc.Utf8.parse(
                $(".detpost").find("a")[res].children[0].parent.attribs.href
              )
            ),
            gambar: $(".detpost").find("a")[res].children[1].children[0].attribs
              .src,
          });
        });
        this.animeShow = true;
      });
  },
};
</script>
