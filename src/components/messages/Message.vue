<template>
  <v-card v-if="author._id !== user" class="d-flex pa-2" color="grey lighten-2" flat>
    <v-avatar color="indigo" size="36" class="rounded-card ma-2">
      <img :src="author.image" :alt="author.name" />
    </v-avatar>
    <v-card max-width="60%" elevation="3" shaped>
      <v-card-text class="text-left pa-4 font-weight-black body-2">{{content}}</v-card-text>
    </v-card>
  </v-card>
  <!-- -->
  <v-card v-else class="d-flex flex-row-reverse pa-3" color="grey lighten-2" flat>
    <v-card max-width="60%" elevation="3" color="blue darken-3" class="rounded">
      <v-card-text class="text-left pa-3 font-weight-medium body-2 white--text">{{content}}</v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "Message",
  props: {
    user: String, //Session User
    author: Object,
    content: String,
    timestamp: String
  }
};
</script>

<style>
</style>