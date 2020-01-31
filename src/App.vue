<template>
  <v-app class="page-back">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>

<style>
.page-back {
  background-color: #f2e68f !important;
}
</style>
