<template>
   <div>
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
import { API } from '../../config/config';
import axios from 'axios';

export default {
  components: {
    'wm-posts': Posts,
    'wm-postform': PostForm
  },
  data() {
    return {
        group: null,
        posts: null,
        postApi: API + 'groups/' + this.$route.params.groups_id + '/posts'
    }
  },
  methods: {
    getPosts() {
         axios.get(API + 'groups/'+ this.$route.params.groups_id )
        .then(data => this.posts = data.data.posts);
    },
    getGroup() {
         axios.get(API +'groups/' + this.$route.params.groups_id)
        .then(data => this.group = data.data);
    }
  },
  mounted() {
    this.getGroup();
    this.getPosts();
  }

}
</script>