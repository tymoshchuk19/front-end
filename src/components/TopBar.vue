<template>
  <v-app-bar app color="indigo darken-2" dark dense>
    <v-btn icon color="pa-0 transparent" depressed @click="() => {$router.push({path: '/'})}">
      <v-icon medium>mdi-book-open-page-variant</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <wm-searchbar />
    <v-spacer></v-spacer>
    {{$store.state.user.nome}}
    <v-btn icon class="ml-2 pa-2">
      <v-avatar
        color="indigo"
        size="38"
        class="rounded-card ma-2"
        @click="$router.push({path: '/users/'+ $store.state.user._id})"
      >
        <img :src="$store.state.user.image" :alt="$store.state.user.nome" />
      </v-avatar>
    </v-btn>
    <v-btn icon class="ml-2 pa-2">
      <v-avatar color="indigo" size="38" class="rounded-card ma-2" @click="logout">
        <v-icon medium>mdi-logout</v-icon>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { API } from "../../config/config";
import SearchBar from "../components/SearchBar";
import axios from "axios";

export default {
  components: {
    "wm-searchbar": SearchBar
  },
  methods: {
    logout() {
      axios
        .get(`${API}logout`)
        .then(() => this.$router.push({ path: "/login" }));
    }
  }
};
</script>


<style>
</style>