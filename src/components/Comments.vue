<template>
  <div class="ma-0 pa-0">
    <fade-transition group>
      <v-card
        class="pa-0 ma-3 mb-1 grey lighten-2"
        v-for="(com, i) in coms"
        :key="i"
        height="90"
      >
        <v-list-item three-line>
          <v-menu
            v-model="menu"
            top
            transition="slide-y-transition"
            origin="bottom"
          >
            <template v-slot:activator="{ on }">
              <v-list-item-avatar v-on="on" size="30" color="primary">
                <img :src="com.author.image" :alt="com.author.nome" />
              </v-list-item-avatar>
            </template>
            <v-card width="280">
              <v-img :src="com.author.image"></v-img>
              <v-list class="no-border" dark tile>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ com.author.nome }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      com.author.email
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      icon
                      @click="
                        () => {
                          $router.push({ path: `/users/${com.author._id}` });
                        }
                      "
                    >
                      <v-icon>mdi-account-box</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>

          <v-list-item-content class="ma-0">
            <v-list-item-text class="mb-1">{{
              com.author.nome
            }}</v-list-item-text>
            <v-list-item-subtitle>{{ com.fromNow }}</v-list-item-subtitle>
            <v-list-item-text-action class="black--text">{{
              com.body
            }}</v-list-item-text-action>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions class="like-position">
          <v-btn
            @click="
              () => {
                like(com._id);
              }
            "
            class="secsecondary like-position"
            text
            rounded
            small
          >
            <span class="white--text text-lowercase mr-2 font-weight-black">{{
              com.likes.length
            }}</span>
            <v-icon v-if="isLiked(i)" color="white">mdi-thumb-up</v-icon>
            <v-icon v-else color="white">mdi-thumb-up-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </fade-transition>
  </div>
</template>

<script>
/*eslint-disable no-console*/
import axios from "axios";
import { API } from "../../config/config";
import { mapState } from "vuex";
import { FadeTransition } from "vue2-transitions";

export default {
  props: ["coms", "postid"],
  components: {
    FadeTransition
  },
  data: () => {
    return {
      //menu: false
    };
  },
  methods: {
    like(id) {
      axios
        .post(API + "posts/" + this.postid + "/comments/" + id + "/like")
        .then(() => {
          this.$emit("newLike");
        });
    },
    isLiked(i) {
      return this.coms[i].likes.includes(this.user._id);
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style>
.like-position {
  position: absolute;
  top: 3px;
  right: 3px;
}
</style>
