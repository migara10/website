<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light main_nav">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand"
          ><img src="../assets/logo1.png" class="_logo" alt=""
        /></router-link>
        <!-- <a class="navbar-brand" href="#"
          ><img src="../assets/logo1.png" class="_logo" alt=""
        /></a> -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <!-- <a class="nav-link "  aria-current="page" href="#">Home</a> -->
              <router-link to="/" class="nav-link active">Home</router-link>
            </li>
          </ul>
          <ul
            class="navbar-nav"
            v-for="opt in options"
            :key="opt"
            :value="opt.value"
          >
            <li class="nav-item">
              <button
                class="nav-link active _router_btn"
                :class="`${opt._cId}category`"
                @click="selectRoute(opt)"
              >
                {{ opt.title }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import jQuery from "jquery";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const $ = jQuery;
window.$ = $;

export default {
  setup() {
    const router = useRouter();
    const options = ref([]);

    //get all categories
    const getAllCategories = () => {
      axios
        .get("category/user")
        .then((res) => {
          options.value = res.data.category;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // select category
    const selectRoute = (val) => {
      router.push({ name: "news", params: { id: val._cId, value: val.value } });
    };
    onMounted(() => {
      getAllCategories();
    });
    return {
      getAllCategories,
      selectRoute,
      options,
    };
  },
};
</script>
‍
<style lang="scss">
._logo {
  width: 150px;
  height: 80px;
}
.main_nav {
  color: white;
  position: fixed !important;
  width: 100%;
  z-index: 999 !important;
  margin-top: 50px;
  .nav-link {
    color: rgb(255, 255, 255) !important;
    font-size: 1em !important;
  }
}
._router_btn {
  background: none !important;
  border: 0;
}
</style>
