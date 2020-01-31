<template>
  <div>
    <wm-topbar />
    <v-row class="page">
      <v-col cols="3">
        <wm-groupform @newGroup="getGroups"></wm-groupform>
        <wm-groups :groups="groups"></wm-groups>
      </v-col>
      <v-col cols="6">
        <wm-postform :api="postApi" @newPost="getPosts"></wm-postform>
        <wm-posts :posts="posts"></wm-posts>
      </v-col>
      <v-col cols="3">
        <wm-tasks :tasks="tasks"></wm-tasks>
        <br />
        <wm-friendslist></wm-friendslist>
      </v-col>
    </v-row>
    <wm-footer></wm-footer>
  </div>
</template>

<script>
import Posts from "../components/Posts";
import Tasks from "../components/Tasks";
// import Header from "../components/Header"
import Groups from "../components/Groups";
import PostForm from "../components/PostForm";
import GroupForm from "../components/GroupForm";
import Footer from "../components/Footer";
import FriendsList from "../components/FriendsList";
import { API } from "../../config/config";
import axios from "axios";
import { mapState } from "vuex";
import TopBarVue from "../components/TopBar.vue";

export default {
  name: "home",
  components: {
    "wm-posts": Posts,
    "wm-tasks": Tasks,
    "wm-groups": Groups,
    "wm-postform": PostForm,
    "wm-groupform": GroupForm,
    "wm-footer": Footer,
    "wm-friendslist": FriendsList,
    "wm-topbar": TopBarVue
  },
  data() {
    return {
      posts: null,
      groups: null,
      tasks: null,
      postApi: API + "posts"
    };
  },
  methods: {
    getPosts() {
      axios.get(API + "feed").then(data => (this.posts = data.data));
    },
    getGroups() {
      axios.get(API + "my/groups").then(data => (this.groups = data.data));
    },
    getTasks() {
      axios
        .get(API + "users/" + this.user._id + "/tasks")
        .then(data => (this.tasks = data.data));
    }
  },
  mounted() {
    this.getPosts();
    this.getGroups();
    this.getTasks();
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style>
.page {
  background-color: #f2e68f;
}
</style>
