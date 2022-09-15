<template>
  <div class="main">
    <div class="_body">
      <div class="news_block">
        <div class="container1">
          <div
            class="items"
            v-for="ourService in allNews"
            :key="ourService._cId"
            data-aos="flip-left"
          >
            <div
              class="card_img"
              :style="{
                backgroundImage:
                  'url(' + `${baseUrl}/${ourService.imgUri}` + ')',
              }"
            >
              <div class="card_text">
                <div class="middle">
                  <h5>{{ ourService.heading }}</h5>
                  <br />
                  <p>{{ ourService.content.slice(0, 100) }}</p>
                </div>
                <div class="_bottom">
                  <p
                    data-bs-toggle="modal"
                    data-bs-target="#newsModal"
                    @click="openSingleNewsPopup(ourService)"
                  >
                    View More123
                  </p>
                </div>
                Last updating in- {{ timeDiff(ourService.updatedAt) }}
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
import { useRoute } from "vue-router";
import moment from "moment";
import newsModel from "./ViewSingleNews.vue";

export default {
  components: {newsModel},
  setup() {
    const route = useRoute();
    // const baseUrl = "https://newsbackend1.herokuapp.com";
    const baseUrl = "http://localhost:5000";
    const allNews = ref([]);
    const routeCategory = ref("");
    const selectedNews = ref(); 

    // get news
    const getNewsByTitle = () => {
      routeCategory.value = route.params.value;
      axios
        .get(`news/${routeCategory.value}`)
        .then((res) => {
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
      getNewsByTitle();
    });
    return {
      baseUrl,
      getNewsByTitle,
      allNews,
      routeCategory,
      timeDiff,
      openSingleNewsPopup,
      selectedNews,
    };
  },
};
</script>

<style scoped lang="scss">
.main {
  background: rgba(125, 125, 125, 0.455);
  height: 100vh;
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
  .container1 {
    margin: 48px 12px 0 12px;
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
            justify-content: center;
            align-items: end;
            /* p{
              text-align: center;
            } */
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
</style>
