<template>
   <div>
    <v-row>
      <v-col cols="3">
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
      <v-col cols="3" class="secondary">
        <wm-groupform @newGroup="getGroups"></wm-groupform>
        <wm-groups :groups="groups" :path="path"></wm-groups>
      </v-col>
      <v-col cols="6">
        <wm-postform :api="postApi" @newPost="getPosts"></wm-postform>
        <v-divider class="mb-2"></v-divider> 
        <wm-posts :posts="posts"></wm-posts>
      </v-col>
      <v-col cols="3" class="secondary">
        <wm-taskform @newTask="getTasks" :taskApi="taskApi"></wm-taskform>
        <wm-tasks :tasks="tasks"></wm-tasks>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Posts from '../components/Posts'
import PostForm from '../components/PostForm'
import Workum from '../components/Workum'
import Header from '../components/Header'
import Signout from '../components/Signout'
import Tasks from '../components/Tasks'
import TasksForm from '../components/TasksForm'
import GroupForm from '../components/GroupForm'
import Groups from '../components/Groups'
import { API } from '../../config/config';
import axios from 'axios';

export default {
  components: {
    'wm-posts': Posts,
    'wm-postform': PostForm,
    'wm-workum': Workum,
    'wm-header': Header,
    'wm-signout': Signout,
    'wm-tasks': Tasks,
    'wm-taskform': TasksForm,
    'wm-groupform': GroupForm,
    'wm-groups': Groups
  },
  data() {
    return {
      path: '',
      group: {name: null},
      posts: null,
      groups: null,
      tasks: null,
      postApi: API + 'groups/' + this.$route.params.group_id + '/posts',
      taskApi: API + 'groups/' + this.$route.params.group_id + '/tasks'
    }
  },
  methods: {
    getPosts() {
         axios.get(this.postApi)
        .then(data => this.posts = data.data.posts);
    },
    getGroup() {
         axios.get(API +'groups/' + this.$route.params.group_id)
        .then(data => this.group = data.data);
    },
    getGroups() {
         axios.get(API + 'groups')
          .then(data => this.groups = data.data);
    },
    getTasks() {
         axios.get(this.taskApi)
          .then(data => this.tasks = data.data);
    }
  },
  mounted() {
    this.getGroup();
    this.getGroups();
    this.getPosts();
    this.getTasks();
  }

}
</script>