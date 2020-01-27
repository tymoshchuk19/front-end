
<template>
  <div>
    <wm-post 
      v-for="post in posts"
      :key="post.title"
      :post="post" >
    </wm-post>
  </div>
</template>

<script>
/*eslint-disable no-console*/
import Post from './Post';

  export default {
    props: ['posts'],
    components: {
      'wm-post': Post
    },
    data () {
      return {
      }
    }
  }
</script>