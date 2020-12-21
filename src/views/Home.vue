<template>
  <div class="container">
    <div
      v-if="anime.length > 0"
      class="d-flex flex-wrap justify-content-around"
    >
        <div v-for="anime in anime[0]" :key="anime.index">
          <div class="card mb-4" style="width: 10rem" :title="anime.title">
            <router-link :to="'/episode/' + anime.id" class="stretched-link"
              ><img :src="anime.thumb" class="card-img-top"
            /></router-link>
            <div class="card-body" style="max-height: 15rem">
              <h5 class="card-title text-bold" :title="anime.title">
                {{ anime.title }}
              </h5>
            </div>
          </div>
        </div>
    </div>
    <div v-else class="d-flex justify-content-center align-self-center">
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
<style scoped>
@media screen and (max-width:411px){
  .card.mb-4{
    width:8rem!important
  }
}
</style>
<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      anime: [],
    };
  },
  mounted() {
    axios.get("https://anime.kaedenoki.net/api/ongoing").then((res) => {
      if (res.status == 200) {
        this.anime.push(res.data.animeList);
      }
    });
  },
};
</script>
