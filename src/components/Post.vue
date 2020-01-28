<template>
  <v-card class="mb-2">
    <v-list-item three-line>
      <v-list-item-avatar size="30" color="primary">
          <img
            :src="post.image"
            alt="Semanas"
          >
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{post.title}}</v-list-item-title>
        <!-- <v-list-item-subtitle>[{{post.type}}]</v-list-item-subtitle> -->
        <v-list-item-action-text class="black--text">{{post.body}}</v-list-item-action-text>
      </v-list-item-content>
    </v-list-item>
    <v-chip 
      class="ma-2"
      v-for="(tag,i) in post.tags" 
      v-bind:key="i">
      {{ tag }}
    </v-chip>
    <v-card-actions>
      <v-btn @click="like" class="indigo" text>
          <span class="white--text text-lowercase mr-2">{{ nlikes }}</span>
          <v-icon v-if="liked" color='white'>mdi-thumb-up</v-icon>
          <v-icon v-else color='white'>mdi-thumb-up-outline</v-icon>
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { USER, API } from '../../config/config';
import axios from "axios";

/*eslint-disable no-console*/
export default {
  props: ['post'],
  data() {
    return {
      user : USER,
      nlikes: this.post.likes.length,
      liked: this.post.likes.includes(USER)
    }
  },
  methods: {
    like() {
      axios.post(API + 'posts/' + this.post._id + '/like', {
        user: USER
      })
        .then(p => {
          console.log(p.data)
          this.nlikes = p.data.likes.length;
          this.liked = p.data.likes.includes(USER);
        });
    }
  }
}
</script>