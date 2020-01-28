<template>
  <div>
      <v-card 
        class="mb-1" 
        v-for="com in coms"
        :key="com.author"
        :post="post" 
      >
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
  </div>
</template>

<script>
/*eslint-disable no-console*/

  export default {
    props: ['posts'],
    data () {
      return {
      }
    }
  }
</script>