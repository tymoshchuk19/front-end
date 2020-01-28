<template>
  <div>
      <v-card 
        class="mb-1 ml-5" 
        v-for="(com,i) in coms"
        :key="i"
      >
        <v-list-item three-line>
        <v-list-item-avatar size="30" color="primary">
            <img
                :src="com.author.image"
                :alt="com.author.name"
            >
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{com.author.nome}}</v-list-item-title>
            <!-- <v-list-item-subtitle>[{{post.type}}]</v-list-item-subtitle> -->
            <v-list-item-action-text class="black--text">{{com.body}}</v-list-item-action-text>
        </v-list-item-content>
        </v-list-item>
        <v-card-actions>
        <v-btn @click="() => {like(com._id)}" class="indigo" text>
            <span class="white--text text-lowercase mr-2">{{ com.likes.length }}</span>
            <v-icon v-if="isLiked(i)" color='white'>mdi-thumb-up</v-icon>
            <v-icon v-else color='white'>mdi-thumb-up-outline</v-icon>
        </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
/*eslint-disable no-console*/
import axios from "axios";
import { USER, API } from '../../config/config';


  export default {
    props: ['coms', "postid"],
    data () {
      return {
        user:USER
      }
    },
    methods: {
      like(id) {
        axios.post(API + 'posts/' + this.postid + '/comments/'+ id + '/like', {user: USER})
        .then(() => {
          this.$emit("newLike");
        })
      },
      isLiked(i) {
        console.log(this.coms[i]);
        return this.coms[i].likes.includes(this.user)
      }
    }
  }
</script>