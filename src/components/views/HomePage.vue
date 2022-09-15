<template>
  <div class="main">
    <div class="_body">
      <div class="_carasoul">
        <div class="slider_block">
          <vueper-slides
            :autoplay="false"
            :slide-content-outside="contentPosition"
            fixed-height="400px"
            slide-image-inside
          >
            <vueper-slide
              v-for="head in newsHeadlings"
              :key="head._cId"
              :image="`${baseUrl}/${head.imgUri}`"
              :title="head.heading"
              :content="head.content"
              transition-speed="250"
              data-bs-toggle="modal"
              data-bs-target="#newsModal"
              @click="openSingleNewsPopup(head)"
            >
            </vueper-slide>
          </vueper-slides>
        </div>
      </div>
      <div class="news_block">
        <div class="pera">
          <h2>Last Updated News</h2>
        </div>
        <div class="container1">
          <div
            class="items"
            v-for="news in allNews"
            :key="news._cId"
            data-aos="flip-left"
          >
            <div
              class="card_img"
              :style="{
                backgroundImage: 'url(' + `${baseUrl}/${news.imgUri}` + ')',
              }"
            >
              <div class="card_text">
                <div class="middle">
                  <h5>{{ news.heading.slice(0, 20) }}</h5>
                  <br />
                  <p>{{ news.content.slice(0, 100) }}</p>
                </div>
                <div class="_bottom">
                  <p
                    data-bs-toggle="modal"
                    data-bs-target="#newsModal"
                    @click="openSingleNewsPopup(news)"
                  >
                    View More
                  </p>
                </div>
                Last updating in- {{ timeDiff(news.updatedAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <news-model :userdata="selectedNews" />
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import moment from "moment";
import newsModel from "./ViewSingleNews.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: {
    newsModel,
    VueperSlides,
    VueperSlide,
  },
  setup() {
    const baseUrl = axios.defaults.baseURL;
    const newsHeadlings = ref([]);
    const allNews = ref([]);
    const selectedNews = ref();

    // get news headlings
    const getHeadlings = () => {
      axios
        .get("news/headline")
        .then((res) => {
          newsHeadlings.value = res.data.news.slice(0, 3);
          allNews.value = res.data.news;
        })
        .catch();
    };

    //get time differance
    const timeDiff = (update) => {
      var dateOne = moment(update);
      var dateTwo = moment(new Date());
      var result = dateTwo.diff(dateOne, "minutes");
      var result2 = dateTwo.diff(dateOne, "hours");
      var result3 = dateTwo.diff(dateOne, "days");
      if (result < 60)
        return result <= 1 ? `${result} minute` : `${result} minutes`;
      else if (result2 < 24)
        return result2 <= 1 ? `${result2} hour` : `${result2} hours`;
      else return result3 <= 1 ? `${result3} day` : `${result3} days`;
    };

    //open single news model
    const openSingleNewsPopup = (news) => {
      selectedNews.value = news;
    };

    onMounted(() => {
      getHeadlings();
    });
    return {
      baseUrl,
      getHeadlings,
      newsHeadlings,
      allNews,
      timeDiff,
      openSingleNewsPopup,
      selectedNews,
    };
  },
};
</script>

<style scoped lang="scss">
.main {
  background: url("@/assets/banners/home_banner.jpg") no-repeat fixed center;
  top: 0px;
  width: 100%;
  z-index: 0;
  ._body {
    padding-top: 150px;
    color: white;
    ._slider {
      color: white;
      ._image {
        height: 300px;
        width: 800px;
      }
    }
  }
}
.news_block {
  .pera{
    text-align: center;
    margin-top: 48px;
  }
  .container1 {
    margin: 24px 12px 0 12px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .items {
      height: 230px;
      width: 100%;
      flex: 1 1 23%;
      max-width: 23%;
      margin: 12px 0px;
      &:hover {
        height: 240px;
        transition: 0.35s all ease;
      }
      .card_img {
        height: 100%;
        background-size: cover;
        background-position: center;
        .card_text {
          height: 100%;
          width: 100%;
          background: rgba(0, 0, 0, 0.404);
          .middle {
            display: inline-block;
            justify-content: center;
            align-items: center;
            p,
            h5 {
              text-align: center;
              color: white;
              font-size: 1.2em;
            }
            h5 {
              margin-top: 24px;
            }
            p {
              font-size: 15px;
              padding: 0 6px;
            }
          }
          ._bottom {
            display: flex;
            justify-content: center;
            p {
              color: red;
            }
          }
        }
      }
    }
  }
  @media (min-width: 500px) and (max-width: 868px) {
    .container1 {
      .items {
        height: 220px;
        width: 100%;
        flex: 1 1 40%;
        max-width: 40%;
        margin: 5%;
        &:hover {
          height: 230px;
        }
      }
    }
  }
}
._carasoul {
  display: flex;
  align-items: center;
  justify-content: center;
  .slider_block {
    width: 70%;
  }
  .vueperslide {
    color: rgb(0, 0, 0);
    background-color: rgb(205, 170, 170) !important;
  }
}
.vueperslide__image {
  transform: scale(1.5) rotate(-10deg) !important;
}

.vueperslide__title {
  font-size: 7em;
  opacity: 0.7;
}
</style>
