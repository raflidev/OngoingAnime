<template>
  <div class="container">
    <div v-if="episodeShow">
      <div class="row mt-4">
        <div class="col-sm-12 col-lg-3">
          <img :src="gambar[0].gambar" alt="" srcset="" />
        </div>
        <div class="col-sm-12 col-lg-9">
          <h2>{{ judul[0].judul }}</h2>
          <p class="pt-3">Daftar Episode:</p>
          <div class="list-group">
            <router-link
              :to="'/nonton/' + episode.base"
              v-for="episode in episode"
              :key="episode.index"
              class="list-group-item list-group-item-action"
            >
              <b>
                {{ episode.judul }}
              </b>
              <p>
                {{ episode.tanggal }}
              </p>
            </router-link>
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
import axios from "axios";
import cheerio from "cheerio";
import CryptoJS from "crypto-js";
export default {
  name: "Episode",
  data() {
    return {
      episode: [],
      gambar: [],
      judul: [],
      episodeShow: false,
    };
  },
  mounted() {
    axios
      .get(
        CryptoJS.enc.Utf8.stringify(
          CryptoJS.enc.Base64.parse(this.$route.params.base)
        )
      )
      .then((response) => {
        const $ = cheerio.load(response.data);
        this.gambar.push({
          gambar: $("img")[1].attribs.src,
        });
        this.judul.push({
          judul: $(".jdlrx")[0].children[0].children[0].data,
        });
        $(".episodelist li").each((res) => {
          this.episode.push({
            link: $(".episodelist li").find("a[data-wpel-link=internal]")[res]
              .attribs.href,
            base: CryptoJS.enc.Base64.stringify(
              CryptoJS.enc.Utf8.parse(
                $(".episodelist li").find("a[data-wpel-link=internal]")[res]
                  .attribs.href
              )
            ),
            judul: $(".episodelist li").find("a[data-wpel-link=internal]")[res]
              .children[0].data,
            tanggal: $(".episodelist li").find(".zeebr")[res].children[0].data,
          });
          //   console.log(
          //     $(".episodelist li").find("a[data-wpel-link=internal]")[res]
          //   );
        });
        this.episodeShow = true;
      });
  },
};
</script>

<style></style>
