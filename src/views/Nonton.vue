<template>
  <div class="container">
   
      <div class="row justify-content-center mt-5">
        <div class="col-12 col-sm-12 col-md-12 col-lg-8">
         <div v-if="nonton.length > 0">
          <h2 class="text-center mb-4">{{nonton[0].title}}</h2>
          <div v-if="nonton[0].link_stream == '-'">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              Layanan stream {{nonton[0].title}} belum tersedia disystem kami, silakan download secara manual
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
            <div v-for="quality in nonton[0].quality" :key="quality.index" class="text-center mb-3">
              <div class="mb-3 font-weight-bold">
                {{quality.quality}} - {{quality.size}}
              </div>
              <div>
                <a v-for="download in quality.download_links" :key="download.index" class="btn btn-warning text-black mr-3 mb-3" target="_blank" :href="download.link">{{download.host}}</a>
              </div>
            </div>
          </div>
          <video v-else class="img-fluid" width="800" height="400" controls>
            <source :src="nonton[0].link_stream" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
      
        <div class="col-12 col-sm-12 col-md-12 col-lg-4 mt-3">
            <div class="list-group">
              <li class="list-group-item"
              v-for="episode in episode[0].episode_list"
              :key="episode.index"
              @click="Nonton(episode.id)">{{ episode.title }}</li>
          </div>
        </div>
      </div>
      </div>
    
 
</template>

<script>
import axios from "axios";
export default {
  // 1. get data episode from api
  // 2. get index and output value to video
  // 3. if viewer refresh, get point 1.
  // 4. filter base to get index, and get point 2.
  name: "Nonton",
  data() {
    return {
      nonton: [],
      episode: [],
    };
  },
  methods:{
    Nonton(id){
      this.nonton = []
      axios
      .get(`https://anime.kaedenoki.net/api/eps/${id}`)
      .then((res) => {
        this.nonton.push(res.data);
      });

      this.$router.push({ name: "Nonton", params: { base: id } });


    }
  },
  // computed:{
  //   cariIndex(){
  //     return this.episode[0].episode_list.filter(post =>{
  //       return post[5].indexOf(post.id == "btr-nng-episode-174-sub-indo/")
  //     })
  //   }
  // },
  mounted(){
     axios
      .get(`https://anime.kaedenoki.net/api/eps/${this.$route.params.base}`)
      .then((res) => {
        this.nonton.push(res.data);
      });
     axios
      .get(`https://anime.kaedenoki.net/api/anime/${localStorage.getItem("anime")}`)
      .then((res) => {
        if (res.status == 200) {
          this.episode.push(res.data);
        }
      });
  },

};
</script>

<style>
</style>
