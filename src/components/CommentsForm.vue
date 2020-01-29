<template>
  <v-card class="pa-2">
    <form class="d-flex">
      <v-text-field
        v-model="body"
        label="Comment"
        single-line
        solo-inverted
        dense
        rounded
        hide-details
      ></v-text-field>
      <v-btn class="ml-3" icon color="primary" v-on:click="postMessage(message)">
        <v-icon @click="submit" size="45">mdi-send-circle</v-icon>
      </v-btn>
    </form>
  </v-card>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { API } from "../../config/config";
import axios from "axios";

/*eslint-disable no-console*/

export default {
  mixins: [validationMixin],
  props: ["postid"],
  validations: {
    body: { required }
  },

  data: () => ({
    body: "",
    rules: [v => !!v || "Comment is required."]
  }),

  methods: {
    submit() {
      axios
        .post(API + "posts/" + this.postid + "/comments", {
          body: this.body
        })
        .then(() => {
          this.$emit("newComment");
          this.clear();
        });
    },
    clear() {
      this.$v.$reset();
      this.body = "";
    }
  }
};
</script>