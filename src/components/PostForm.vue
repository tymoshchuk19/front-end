<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="450">
      <template v-slot:activator="{ on }">
        <v-btn class="pa-0 button-width" color="indigo darken-1" tile dark v-on="on">
          Create new post
          <v-icon class="ml-2" size="26" color="white">mdi-plus-circle</v-icon>
        </v-btn>
      </template>
      <v-card class="pr-2 pl-2 pb-2 mb-4">
        <form>
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            label="Title"
            required
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          ></v-text-field>
          <v-textarea counter outlined v-model="body" label="Content" :rules="rules"></v-textarea>
          <v-combobox multiple solo clearable v-model="tags" chips deletable-chips label="Tags"></v-combobox>

          <v-btn class="primary mr-4" text rounded @click="submit">Submit</v-btn>
          <v-btn color="primary darken-1" text @click="dialog = false">Close</v-btn>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import axios from "axios";

/*eslint-disable no-console*/

export default {
  mixins: [validationMixin],
  props: ["api"],
  validations: {
    title: { required },
    body: { required }
  },

  data: () => ({
    dialog: false,
    title: "",
    rules: [v => !!v || "Content is required."],
    body: "",
    tags: ""
  }),

  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Title is required.");
      return errors;
    },
    tagErrors() {
      const errors = [];
      if (!this.$v.tag.$dirty) return errors;
      return errors;
    }
  },

  methods: {
    submit() {
      axios
        .post(this.api, {
          title: this.title,
          body: this.body,
          tags: this.tags ? this.tags : []
        })
        .then(() => {
          this.dialog = false;
          this.$emit("newPost");
          this.clear();
        });
    },
    clear() {
      this.$v.$reset();
      this.title = "";
      this.body = "";
      this.tags = "";
    }
  }
};
</script>

<style>
.button-width {
  width: 97.5%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>