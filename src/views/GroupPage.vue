<template>
  <div>
    <v-row>
      <v-col cols="1">
        <wm-sidebar></wm-sidebar>
      </v-col>
      <v-col cols="11">
        <v-row>
          <v-col cols="2">
            <wm-workum></wm-workum>
          </v-col>
          <v-col cols="6">
            <wm-header :name="group.name"></wm-header>
          </v-col>
          <v-col cols="3">
            <wm-signout></wm-signout>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" class="secondary">
            <wm-groupform @newGroup="getGroups"></wm-groupform>
            <wm-groups :groups="groups"></wm-groups>
          </v-col>
          <v-col cols="6">
            <wm-postform :api="postApi" @newPost="getPosts"></wm-postform>
            <v-divider class="mb-2"></v-divider>
            <wm-posts :posts="posts"></wm-posts>
          </v-col>
          <v-col cols="3" class="secondary">
            <wm-taskform @newTask="() => getTasks(group_id)" :taskApi="taskApi"></wm-taskform>
            <wm-tasks :tasks="tasks"></wm-tasks>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <wm-footer></wm-footer>
  </div>
</template>

<script>
/*eslint-disable no-console*/

import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import Workum from "../components/Workum";
import Header from "../components/Header";
import Signout from "../components/Signout";
import Tasks from "../components/Tasks";
import TasksForm from "../components/TasksForm";
import GroupForm from "../components/GroupForm";
import Groups from "../components/Groups";
import { API } from "../../config/config";
import axios from "axios";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

export default {
  components: {
    "wm-posts": Posts,
    "wm-postform": PostForm,
    "wm-workum": Workum,
    "wm-header": Header,
    "wm-signout": Signout,
    "wm-tasks": Tasks,
    "wm-taskform": TasksForm,
    "wm-groupform": GroupForm,
    "wm-groups": Groups,
    "wm-footer": Footer,
    "wm-sidebar": SideBar
  },
  data() {
    return {
      path: "",
      group: { name: null },
      posts: null,
      groups: null,
      group_id: this.$route.params.group_id,
      tasks: null,
      postApi: API + "groups/" + this.$route.params.group_id + "/posts",
      taskApi: API + "groups/" + this.$route.params.group_id + "/tasks"
    };
  },
  watch: {
    $route: function(to) {
      console.log(to.params.group_id);

      this.group_id = to.params.group_id;
      this.taskApi = API + "groups/" + to.params.group_id + "/tasks";

      this.getGroup(to.params.group_id);
      this.getGroups();
      this.getPosts(to.params.group_id);
      this.getTasks(to.params.group_id);
    }
  },
  methods: {
    getPosts(group_id) {
      axios
        .get(API + "groups/" + group_id + "/posts")
        .then(data => (this.posts = data.data.posts));
    },
    getGroup(group_id) {
      axios
        .get(API + "groups/" + group_id)
        .then(data => (this.group = data.data));
    },
    getGroups() {
      axios.get(API + "my/groups").then(data => (this.groups = data.data));
    },
    getTasks(group_id) {
      axios
        .get(API + "groups/" + group_id + "/tasks")
        .then(data => (this.tasks = data.data));
    }
  },
  mounted() {
    this.getGroup(this.$route.params.group_id);
    this.getGroups();
    this.getPosts(this.$route.params.group_id);
    this.getTasks(this.$route.params.group_id);
  }
};
</script>