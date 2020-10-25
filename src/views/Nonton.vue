<template>
  <div class="container">
    <div v-if="nontonShow">
      <div class="row justify-content-center mt-5">
        <div class="col-6">
          <video width="500" height="300" controls>
            <source :src="link" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
  name: "Nonton",
  data() {
    return {
      link: "",
      nontonShow: false,
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
        var $ = cheerio.load(response.data);
        var data = $(".responsive-embed-stream").find("iframe")[0].attribs.src;

        axios.get(data).then(async (res) => {
          console.log(res);
        });
        axios.get(data).then((response) => {
          $ = cheerio.load(response.data, { xmlMode: true });
          var script = $("script")[2].children[0].data;
          data = JSON.parse(script.match(/\{.*\}/g))["file"];
          this.link = data;
          this.nontonShow = true;
        });
      });
  },
};
</script>

<style></style>
