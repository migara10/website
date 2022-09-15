<template>
  <div
    class="modal fade"
    id="newsModal"
    tabindex="-1"
    aria-labelledby="newsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="newsModalLabel">
            {{ newsData.heading }}
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- start of the edit box -->
          <h6>Category: {{ newsData.category }}</h6>
          <img class="_image_size" :src="`${baseUrl}/${newsData.imgUri}`" alt="" />
          <p class="m-1 mt-3">{{ newsData.content }}</p>
          <!-- end of the edit box -->
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <!-- <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Save
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onUpdated, ref } from "vue";
// import vSelect from "vue-select";
// import "vue-select/dist/vue-select.css";
// import { useToast } from "vue-toastification";
// import $ from "jquery";
export default {
  components: {
    // vSelect,
  },
  props: {
    userdata: {},
  },
  setup(props) {
    const newsData = ref({});
    const baseUrl = axios.defaults.baseURL;
    /* onMounted(() => {
    }); */
    onUpdated(() => {
      newsData.value = props.userdata;
    });
    return {
      newsData,
      baseUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
._image_size {
  width: 100%;
  height: 300px;
}
</style>
