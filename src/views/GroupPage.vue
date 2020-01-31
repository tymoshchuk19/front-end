<template>
  <div class="page">
    <wm-topbar />
    <v-row>
      <v-col cols="3">
        <wm-groupform @newGroup="getGroups"></wm-groupform>
        <wm-groups :groups="groups"></wm-groups>
        <v-divider></v-divider>
        <v-text-field
          type="text"
          v-model="newmember"
          filled
          label="Add member"
          clearable
        ></v-text-field>
        <wm-newmembers
          @newMember="() => getMembers()"
          :friends="filteredFriends"
          :perms="admin"
          :group="group_id"
        ></wm-newmembers>
        <v-divider></v-divider>
        <v-text-field
          type="text"
          v-model="search"
          filled
          label="Group member"
          clearable
        ></v-text-field>
        <wm-members
          @newMember="() => getMembers()"
          :members="filteredMembers"
          :perms="admin"
          :group="group_id"
        ></wm-members>
      </v-col>
      <v-col cols="6">
        <wm-header :name="group.name"></wm-header>

        <wm-postform
          :api="postApi"
          @newPost="() => getPosts($route.params.group_id)"
        ></wm-postform>
        <v-divider class="mb-2"></v-divider>
        <wm-posts :posts="posts"></wm-posts>
      </v-col>
      <v-col cols="3">
        <wm-taskform
          v-if="admin"
          @newTask="() => getTasks(group_id)"
          :taskApi="taskApi"
        ></wm-taskform>
        <wm-tasks
          :tasks="tasks"
          :perms="admin"
          @newTask="() => getTasks(group_id)"
        ></wm-tasks>
      </v-col>
    </v-row>
    <wm-footer></wm-footer>
  </div>
</template>

<script>
/*eslint-disable no-console*/

import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import Header from "../components/Header";
import Tasks from "../components/Tasks";
import TasksForm from "../components/TasksForm";
import GroupForm from "../components/GroupForm";
import Groups from "../components/Groups";
import TopBarVue from "../components/TopBar.vue";

import { API } from "../../config/config";
import axios from "axios";
import Footer from "../components/Footer";
import Members from "../components/Members";
import NewMember from "../components/NewMember";
import { mapState } from "vuex";

export default {
  components: {
    "wm-posts": Posts,
    "wm-postform": PostForm,
    "wm-header": Header,
    "wm-tasks": Tasks,
    "wm-taskform": TasksForm,
    "wm-groupform": GroupForm,
    "wm-groups": Groups,
    "wm-footer": Footer,
    "wm-members": Members,
    "wm-newmembers": NewMember,
    "wm-topbar": TopBarVue
  },
  data() {
    return {
      admin: false,
      path: "",
      search: "",
      members: "",
      newmember: "",
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
      this.group_id = to.params.group_id;
      this.taskApi = API + "groups/" + to.params.group_id + "/tasks";
      this.postApi = API + "groups/" + to.params.group_id + "/posts";
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
      axios.get(API + "groups/" + group_id).then(data => {
        this.group = data.data;
        this.admin = this.group.users.find(obj => {
          return obj.user._id === this.user._id && obj.role === "admin";
        });
      });
    },
    getGroups() {
      axios.get(API + "my/groups").then(data => (this.groups = data.data));
    },
    getMembers() {
      axios.get(API + "groups/" + this.group_id + "/members").then(data => {
        this.members = data.data;
      });
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
    this.getMembers();
    this.getPosts(this.$route.params.group_id);
    this.getTasks(this.$route.params.group_id);
  },
  computed: {
    filteredMembers: function() {
      return this.members.filter(member => {
        return member.user.nome.match(this.search);
      });
    },
    filteredFriends: function() {
      return this.user.friends.filter(friend => {
        return friend.nome.match(this.newmember);
      });
    },
    ...mapState(["user"])
  }
};
</script>

<style>
html body {
  height: 100% !important;
}
</style>
