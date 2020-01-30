<template>
  <div class="ml-10">
    <h3>Pending</h3>
    <v-card v-for="friend in user.pending" v-bind:key="friend._id" class="mt-1">
      <v-list-item>
        <v-list-item-avatar size="10" color="green"></v-list-item-avatar>
        <v-list-item-avatar color="grey">
          <img :src="friend.image" />
        </v-list-item-avatar>
        <v-list-item>{{friend.nome}}</v-list-item>
        <v-btn icon color="primary" @click="() => accept(friend._id)">
          <v-icon size="30">mdi-check-circle</v-icon>
        </v-btn>

        <v-btn icon color="red" @click="() => reject(friend._id)">
          <v-icon size="30">mdi-close-circle</v-icon>
        </v-btn>
      </v-list-item>
    </v-card>
    <v-divider></v-divider>
    <h3>Friends</h3>
    <v-card v-for="friend in user.friends" v-bind:key="friend._id" class="mt-1">
      <v-list-item>
        <v-list-item-avatar size="10" color="green"></v-list-item-avatar>
        <v-list-item-avatar color="grey">
          <img :src="friend.image" />
        </v-list-item-avatar>
        <v-list-item>{{friend.nome}}</v-list-item>
        <v-btn icon color="red" @click="() => remove(friend._id)">
          <v-icon size="30">mdi-close-circle</v-icon>
        </v-btn>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-console */

import { mapState, mapMutations } from "vuex";
import axios from "axios";
import { API } from "../../config/config";

export default {
  methods: {
    remove(friendId) {
      axios
        .post(`${API}users/${friendId}/remove`)
        .then(({ data }) => this.setUser({ user: data }));
    },
    accept(friendId) {
      axios
        .post(`${API}users/${friendId}/accept`)
        .then(({ data }) => this.setUser({ user: data }));
    },
    reject(friendId) {
      axios
        .post(`${API}users/${friendId}/reject`)
        .then(({ data }) => this.setUser({ user: data }));
    },
    ...mapMutations(["setUser"])
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style>
</style>