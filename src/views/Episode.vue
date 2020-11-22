<template>
  <div class="container">
    <div v-if="episode.length > 0">
      <div class="row mt-4">
        <div class="col-sm-12 col-lg-3">
          <img :src="episode[0].thumb" alt="" srcset="" />
        </div>
        <div class="col-sm-12 col-lg-9">
          <h2>{{ episode[0].title }}</h2>
          <div>
            <span>{{episode[0].japanase}}</span>
            <p>{{episode[0].producer}}</p>
          </div>
          <div>
            <p>Sinopsis :</p>
            <div v-if="!readmore" >
              {{episode[0].synopsis.substring(0, 200)}} <a class="text-primary" @click="readmore = true">baca selengkapnya</a>
            </div>
            <div v-else>
              {{episode[0].synopsis}} <a class="text-primary" @click="readmore = false">tutup sinopsis</a>
            </div>
          </div>
          <p class="pt-3">Daftar Episode:</p>
          <div class="list-group">
            <router-link
              :to="'/nonton/' + episode.id"
              v-for="episode in episode[0].episode_list"
              :key="episode.index"
              class="list-group-item list-group-item-action"
            >
              <b>
                {{ episode.title }}
              </b>
              <p>
                {{ episode.uploaded_on }}
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
export default {
  name: "Episode",
  data() {
    return {
      episode: [],
      readmore: false
    };
  },
  mounted() {
    axios
      .get(`https://anime.kaedenoki.net/api/anime/${this.$route.params.base}`)
      .then((res) => {
        if (res.status == 200) {
          this.episode.push(res.data);
        }
      });
  },
};
</script>

<style></style>
