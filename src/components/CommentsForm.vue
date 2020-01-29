<template>
  <v-card class="pa-2">
    <form>
      <v-row no-gutters>
        <v-col cols="12" sm="10">
          <v-textarea
            counter
            outlined
            v-model="body"
            label="Comment"
            :rules="rules"
            auto-grow
            rows="1"
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn class="mr-4" @click="submit">submit</v-btn>
        </v-col>
      </v-row>
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