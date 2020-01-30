<template>
  <div>
    <v-app-bar app color="indigo darken-2" dark dense>
      <div class="d-flex align-center">
        <wm-searchbar />

        <v-toolbar-title>Place holder</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-row>
      <v-col cols="3">
        <wm-workum></wm-workum>
      </v-col>
      <v-col cols="6">
        <wm-header :name="userprofile.nome"></wm-header>
      </v-col>
      <v-col cols="3">
        <wm-signout></wm-signout>
        <v-btn v-if="!mates" color="primary" @click="addFriend">Add friend</v-btn>
        <v-btn v-else color="primary" @click="removeFriend">Remove friend</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="secondary">
        <wm-groups v-if="mates" :groups="groups"></wm-groups>
      </v-col>
      <v-col cols="6" class="secondary">
        <wm-posts v-if="mates" :posts="posts"></wm-posts>
      </v-col>
      <v-col cols="3" class="secondary">
        <wm-tasks v-if="mates" :tasks="tasks"></wm-tasks>
        <br />
        <wm-friendslist></wm-friendslist>
      </v-col>
    </v-row>
    <!-- <wm-footer></wm-footer> -->
  </div>
</template>

<script>
/*eslint-disable no-console*/
import Posts from "../components/Posts";
import Workum from "../components/Workum";
import Tasks from "../components/Tasks";
import Header from "../components/Header";
import Groups from "../components/Groups";
import Signout from "../components/Signout";
//import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

import FriendsList from "../components/FriendsList";
import { API } from "../../config/config";
import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {
    "wm-posts": Posts,
    "wm-workum": Workum,
    "wm-tasks": Tasks,
    "wm-header": Header,
    "wm-groups": Groups,
    "wm-signout": Signout,
    "wm-searchbar": SearchBar,

    //"wm-footer": Footer,
    "wm-friendslist": FriendsList
  },
  watch: {
    $route() {
      this.getUserProfile();
      this.getPosts();
      this.getGroups();
      this.getTasks();
    }
  },
  data() {
    return {
      mates: false,
      userprofile: null,
      posts: null,
      groups: null,
      tasks: null,
      postApi: API + "posts"
    };
  },
  methods: {
    getUserProfile() {
      axios
        .get(API + "users/" + this.$route.params.user_id)
        .then(data => (this.userprofile = data.data));
    },
    getPosts() {
      axios.get(API + "users/" + this.$route.params.user_id + '/posts').then(data => (this.posts = data.data));
    },
    getGroups() {
      axios.get(API + "my/groups").then(data => (this.groups = data.data));
    },
    getTasks() {
      axios
        .get(API + "users/" + this.user._id + "/tasks")
        .then(data => (this.tasks = data.data));
    },
    addFriend() {
      axios
        .post(API + "users/" + this.userprofile._id + "/request", {})
        .then(() => {
          console.log("request sended");
        });
    },
    removeFriend() {
      axios
        .post(API + "users/" + this.userprofile._id + "/remove", {})
        .then(() => {
          console.log("request sended");
          this.mates = !this.mates;
          });
    }
  },
  mounted() {
    this.getUserProfile();
    this.getPosts();
    this.getGroups();
    this.getTasks();
    this.mates = this.user.friends.find(obj => {
      return obj._id === this.$route.params.user_id;
    });
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
