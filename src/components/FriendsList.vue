<template>
  <v-card color="indigo darken-1 mr-3">
    <v-card-text>
      <p class="headline white-font">Friends</p>
      <h3 v-if="user.pending.length">Pending</h3>
      <div v-if="user.pending.length">
        <v-card v-for="friend in user.pending" v-bind:key="friend._id" class="mt-1 mb-8">
          <v-list-item>
            <v-list-item-avatar size="10" color="green"></v-list-item-avatar>
            <!-- -->
            <v-menu v-model="menu" top transition="slide-y-transition" origin="bottom">
              <template v-slot:activator="{ on }">
                <v-list-item-avatar v-on="on" size="40" color="primary">
                  <img :src="friend.image" :alt="friend.nome" />
                </v-list-item-avatar>
              </template>
              <v-card width="280">
                <v-img :src="friend.image"></v-img>
                <v-list class="no-border" dark tile>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{friend.nome}}</v-list-item-title>
                      <v-list-item-subtitle>{{friend.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        icon
                        @click="() => {
                    $router.push({path : `/users/${friend._id}`});
                    }"
                      >
                        <v-icon>mdi-account-box</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
            <!-- -->

            <v-list-item>{{friend.nome}}</v-list-item>
            <v-btn icon color="green" @click="() => accept(friend._id)">
              <v-icon size="30">mdi-check-circle</v-icon>
            </v-btn>

            <v-btn icon color="red" @click="() => reject(friend._id)">
              <v-icon size="30">mdi-close-circle</v-icon>
            </v-btn>
          </v-list-item>
        </v-card>
      </div>

      <!-- -->
      <v-divider dark class="mt-1"></v-divider>
      <v-card v-for="friend in user.friends" v-bind:key="friend._id" class="mt-1">
        <v-list-item>
          <v-list-item-avatar size="10" color="green"></v-list-item-avatar>
          <!-- -->
          <v-menu v-model="menu" top transition="slide-y-transition" origin="bottom">
            <template v-slot:activator="{ on }">
              <v-list-item-avatar v-on="on" size="40" color="primary">
                <img :src="friend.image" :alt="friend.nome" />
              </v-list-item-avatar>
            </template>
            <v-card width="280">
              <v-img :src="friend.image"></v-img>
              <v-list class="no-border" dark tile>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{friend.nome}}</v-list-item-title>
                    <v-list-item-subtitle>{{friend.email}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      icon
                      @click="() => {
                    $router.push({path : `/users/${friend._id}`});
                    }"
                    >
                      <v-icon>mdi-account-box</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
          <!-- -->
          <v-list-item>{{friend.nome}}</v-list-item>
          <v-btn icon color="red" @click="() => remove(friend._id)">
            <v-icon size="30">mdi-close-circle</v-icon>
          </v-btn>
        </v-list-item>
      </v-card>
    </v-card-text>
  </v-card>
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