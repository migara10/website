<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light main_nav">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand" @click="gotoHome()"
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
              <router-link to="/" class="active _nav" @click="gotoHome()">Home</router-link>
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
                class="_router_btn"
                :class="`category${opt._cId}`"
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
    const selectRoute = async (val) => {
      router.push({ name: "news", params: { id: val._cId, value: val.value } });
      const home = document.getElementsByClassName(`_nav`);
      home[0].classList.remove("router-link-exact-active");
      const tab = document.getElementsByClassName(`category${val._cId}`);
      tab[0].classList.add("tab_btn");

      for (let i = 0; i < options.value.length; i++) {
        if (options.value[i]._cId !== val._cId) {
          const tab = document.getElementsByClassName(`_router_btn `);
          tab[i].classList.remove("tab_btn");
        }
      }
    };

    const gotoHome = () => {
      for (let i = 0; i < options.value.length; i++) {
         const tab = document.getElementsByClassName(`_router_btn `);
          tab[i].classList.remove("tab_btn");
      }
    }
    onMounted(() => {
      getAllCategories();
    });
    return {
      getAllCategories,
      selectRoute,
      options,
      gotoHome,
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
  background: #0000001f;
  .nav-link {
    color: rgb(0, 0, 0) !important;
    font-size: 1em !important;
  }
}
._router_btn {
  background: none !important;
  border: 0;
  color: rgb(255, 255, 255);
  font-weight: 400;
  font-size: 1.4rem;
}
.tab_btn {
  color: rgb(191, 16, 16) !important;
  font-weight: 400;
  font-size: 1.4rem;
}
.router-link-exact-active {
  color: rgb(191, 16, 16) !important;
  text-decoration: none;
  font-weight: 400;
  font-size: 1.4rem;
}
._nav {
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-weight: 400;
  font-size: 1.4rem;
}
a:hover {
  color: #ffffff;
  font-weight: 400;
  font-size: 1.4rem;
}
</style>
