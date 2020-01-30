<template>
  <div class="home">
    <v-app-bar app color="indigo darken-2" dark dense>
      <div class="d-flex align-center">
        <v-toolbar-title>Place holder</v-toolbar-title>
      </div>
      <wm-searchbar />

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-row>
      <v-col cols="1">
        <wm-sidebar></wm-sidebar>
      </v-col>
      <v-col cols="11">
        <v-row>
          <v-col cols="3">
            <wm-workum></wm-workum>
          </v-col>
          <v-col cols="6">
            <wm-header :name="user.nome"></wm-header>
          </v-col>
          <v-col cols="3">
            <wm-signout></wm-signout>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3" class="secondary">
            <wm-groupform @newGroup="getGroups"></wm-groupform>
            <wm-groups :groups="groups"></wm-groups>
          </v-col>
          <v-col cols="6" class="secondary">
            <wm-postform :api="postApi" @newPost="getPosts"></wm-postform>
            <wm-posts :posts="posts"></wm-posts>
          </v-col>
          <v-col cols="3" class="secondary">
            <wm-tasks :tasks="tasks"></wm-tasks>
            <br />
            <wm-friendslist></wm-friendslist>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <wm-footer></wm-footer>
  </div>
</template>

<script>
import Posts from "../components/Posts";
import Workum from "../components/Workum";
import Tasks from "../components/Tasks";
import Header from "../components/Header";
import Groups from "../components/Groups";
import Signout from "../components/Signout";
import PostForm from "../components/PostForm";
import GroupForm from "../components/GroupForm";
import Footer from "../components/Footer";
import FriendsList from "../components/FriendsList";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import { API } from "../../config/config";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    "wm-posts": Posts,
    "wm-workum": Workum,
    "wm-tasks": Tasks,
    "wm-header": Header,
    "wm-groups": Groups,
    "wm-signout": Signout,
    "wm-postform": PostForm,
    "wm-groupform": GroupForm,
    "wm-footer": Footer,
    "wm-sidebar": SideBar,
    "wm-friendslist": FriendsList,
    "wm-searchbar": SearchBar
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
      axios.get(API + "/feed").then(data => (this.posts = data.data));
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
