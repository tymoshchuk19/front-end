<template>
  <div class="home">

    <v-row>
      <v-col cols="3">
        <wm-workum></wm-workum>
      </v-col>
      <v-col cols="6">
        <wm-header></wm-header>
      </v-col>
      <v-col cols="3">
        <wm-signout></wm-signout>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <wm-groupform @newGroup="getGroups"></wm-groupform>
        <wm-groups :groups="groups"></wm-groups>
      </v-col>
      <v-col cols="6">
        <wm-postform :api="postApi" @newPost="getPosts"></wm-postform>
        <wm-posts :posts="posts"></wm-posts>
      </v-col>
      <v-col cols="3">
        <wm-deliverables></wm-deliverables>
      </v-col>
    </v-row>
    
  </div>
</template>

<script>
import Posts from '../components/Posts'
import Workum from '../components/Workum'
import Deliverables from '../components/Deliverables'
import Header from '../components/Header'
import Groups from '../components/Groups'
import Signout from '../components/Signout'
import PostForm from '../components/PostForm'
import { USER, API } from '../../config/config';
import axios from 'axios';
import GroupForm from '../components/GroupForm'

export default {
  name: 'home',
  components: {
    'wm-posts': Posts,
    'wm-workum': Workum,
    'wm-deliverables': Deliverables,
    'wm-header': Header,
    'wm-groups': Groups,
    'wm-signout': Signout,
    'wm-postform': PostForm,
    'wm-groupform': GroupForm
  },
  data() {
    return {
        posts: null,
        groups: null,
        postApi: API + 'posts'
    }
  },
  methods: {
    getPosts() {
         axios.get(API +'users/' + USER + '/posts')
        .then(data => this.posts = data.data);
    },
    getGroups() {
         axios.get(API + 'groups')
          .then(data => this.groups = data.data);
    }

  },
  mounted() {
    this.getPosts();
    this.getGroups();
  }
}
</script>
