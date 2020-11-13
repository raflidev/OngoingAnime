<template>
  <div class="container">
    <div v-if="nonton.length > 0">
      <div class="row justify-content-center mt-5">
        <div class="col-6">
          <video width="500" height="300" controls>
            <source :src="nonton[0].link_stream" type="video/mp4" />
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
export default {
  name: "Nonton",
  data() {
    return {
      nonton: [],
    };
  },
  mounted() {
    axios
      .get(`https://anime.kaedenoki.net/api/eps/${this.$route.params.base}`)
      .then((res) => {
        this.nonton.push(res.data);
      });
  },
};
</script>

<style></style>
