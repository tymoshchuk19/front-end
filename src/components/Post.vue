<template>
  <v-card class="mb-2">
    <v-list-item three-line>
      <v-menu
        v-model="menu"
        top
        transition="slide-y-transition"
        origin="bottom"
      >
        <template v-slot:activator="{ on }">
          <v-list-item-avatar v-on="on" size="40" color="primary">
            <img :src="post.posted_by.image" :alt="post.posted_by.nome" />
          </v-list-item-avatar>
        </template>
        <v-card width="280">
          <v-img :src="post.posted_by.image"></v-img>
          <v-list class="no-border" dark tile>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ post.posted_by.nome }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  post.posted_by.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  icon
                  @click="
                    () => {
                      $router.push({ path: `/users/${post.posted_by._id}` });
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

      <v-list-item-content>
        <v-list-item-title class="headline mb-0">{{
          post.title
        }}</v-list-item-title>
        <v-list-item-action-text>{{ fromNow }}</v-list-item-action-text>
        <v-chip-group column>
          <v-chip v-for="tag in post.tags" :key="tag">{{ tag }}</v-chip>
        </v-chip-group>

        <v-list-item-action-text class="black--text mt-2 body-1">{{
          post.body
        }}</v-list-item-action-text>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions class="d-flex flex-row-reverse">
      <v-btn @click="like" class="secprimary" text rounded>
        <span class="indigo--text text-lowercase mr-2 font-weight-black">{{
          nlikes
        }}</span>
        <v-icon v-if="liked" color="indigo">mdi-thumb-up</v-icon>
        <v-icon v-else color="indigo">mdi-thumb-up-outline</v-icon>
      </v-btn>
    </v-card-actions>

    <wm-comments
      @newLike="getComments"
      :postid="post._id"
      :coms="comments"
    ></wm-comments>
    <wm-commentform
      @newComment="getComments"
      :postid="post._id"
    ></wm-commentform>
  </v-card>
</template>

<script>
import { USER, API } from "../../config/config";
import CommentsForm from "../components/CommentsForm";
import Comments from "../components/Comments";
import axios from "axios";
import { mapGetters } from "vuex";
import moment from "moment";

/*eslint-disable no-console*/
export default {
  props: ["post"],
  components: {
    "wm-commentform": CommentsForm,
    "wm-comments": Comments
  },
  data() {
    return {
      menu: false,
      nlikes: this.post.likes.length,
      liked: false,
      comments: this.post.comments,
      fromNow: this.post.fromNow
    };
  },
  methods: {
    like() {
      axios
        .post(API + "posts/" + this.post._id + "/like", {
          user: USER
        })
        .then(p => {
          this.nlikes = p.data.likes.length;
          this.liked = p.data.likes.includes(this.id);
        });
    },
    getComments() {
      axios.get(API + "posts/" + this.post._id + "/comments").then(data => {
        this.comments = data.data;
      });
    },
    isLiked() {
      this.liked = this.post.likes.includes(this.id);
    },
    updateFromNow() {
      setInterval(() => {
        this.fromNow = moment(this.post.date).fromNow();
      }, 60000);
    }
  },
  mounted() {
    // this.getComments();
    this.isLiked();
    this.updateFromNow();
  },
  computed: {
    ...mapGetters({
      id: "getId"
    })
  }
};
</script>

<style>
.no-border {
  border-radius: 0px;
}
</style>
