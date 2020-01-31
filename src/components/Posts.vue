<template>
  <div>
    <fade-transition group>
      <wm-post v-for="post in posts" :key="post._id" :post="post"></wm-post>
    </fade-transition>
  </div>
</template>

<script>
/*eslint-disable no-console*/

import Post from "./Post";
import { FadeTransition } from "vue2-transitions";

export default {
  props: ["posts"],
  components: {
    "wm-post": Post,
    FadeTransition
  },
  data() {
    return {};
  }
};
</script>
