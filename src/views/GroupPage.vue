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
      <v-col cols="6">
        <wm-postform :api="postApi" @newPost="getPosts"></wm-postform>
        <v-divider class="mb-2"></v-divider> 
        <wm-posts :posts="posts"></wm-posts>
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
import { API } from '../../config/config';
import axios from 'axios';

export default {
  components: {
    'wm-posts': Posts,
    'wm-postform': PostForm,
    'wm-workum': Workum,
    'wm-header': Header,
    'wm-signout': Signout
  },
  data() {
    return {
        group: {name: null},
        posts: null,
        postApi: API + 'groups/' + this.$route.params.group_id + '/posts'
    }
  },
  methods: {
    getPosts() {
         axios.get(API + 'posts/' + this.$route.params.group_id )
        .then(data => this.posts = data.data.posts);
    },
    getGroup() {
         axios.get(API +'groups/' + this.$route.params.group_id)
        .then(data => this.group = data.data);
    }
  },
  created() {
    this.getGroup();
    this.getPosts();
  }

}
</script>