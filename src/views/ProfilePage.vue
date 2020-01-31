<template>
  <div class="page">
    <wm-topbar />

    <v-row>
      <v-col cols="3">
        <wm-workum :user="userprofile"></wm-workum>
        <wm-groups v-if="mates" :groups="groups"></wm-groups>
      </v-col>
      <v-col cols="6">
        <wm-posts v-if="mates" :posts="posts"></wm-posts>
      </v-col>
      <v-col cols="3">
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
import Groups from "../components/Groups";
import TopBarVue from "../components/TopBar.vue";
// import Footer from "../components/Footer";

import FriendsList from "../components/FriendsList";
import { API } from "../../config/config";
import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {
    "wm-posts": Posts,
    "wm-workum": Workum,
    "wm-tasks": Tasks,
    "wm-groups": Groups,
    "wm-topbar": TopBarVue,

    // "wm-footer": Footer,
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
      axios
        .get(API + "users/" + this.$route.params.user_id + "/posts")
        .then(data => (this.posts = data.data));
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
