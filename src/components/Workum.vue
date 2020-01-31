<template>
  <v-card color="ma-2 pa-2 pl-0">
    <v-list-item three-line>
      <v-avatar color="indigo" size="80" class="mr-2">
        <v-img :src="user.image" :alt="user.nome" />
      </v-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{
          user.nome
        }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.about }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list-item class="">
      <v-list-item-icon>
        <v-icon>mdi-email</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        {{ user.email }}
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="m-0 ">
      <v-list-item-icon>
        <v-icon>mdi-calendar</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        {{ user.bDate }}
      </v-list-item-content>
    </v-list-item>
    <div class="pa-2 mb--1">
      <v-btn
        v-if="!mates"
        color="indigo darken-1"
        class="text--white"
        @click="addFriend"
        >Add friend</v-btn
      >
      <v-btn
        v-else
        color="indigo darken-1"
        class="text--white"
        @click="removeFriend"
        >Remove friend</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import { API } from "../../config/config";

import axios from "axios";
export default {
  props: ["user"],
  data() {
    return {
      mates: false
    };
  },
  methods: {
    addFriend() {
      axios
        .post(API + "users/" + this.user._id + "/request", {})
        .then(() => {});
    },
    removeFriend() {
      axios.post(API + "users/" + this.user._id + "/remove", {}).then(() => {
        this.mates = !this.mates;
      });
    }
  },
  mounted() {
    this.mates = this.$store.state.user.friends.find(obj => {
      return obj._id === this.$route.params.user_id;
    });
  }
};
</script>
