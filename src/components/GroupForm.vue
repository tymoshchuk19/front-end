<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn block tile color="primary" dark v-on="on">New Group</v-btn>
      </template>
      <v-card class="pr-2 pl-2 pb-2 mb-4">
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-textarea counter outlined v-model="description" label="Description" :rules="rules"></v-textarea>

          <v-btn class="primary mr-4" text rounded @click="submit">submit</v-btn>
          <v-btn color="primary darken-1" text @click="dialog = false">Close</v-btn>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { API } from "../../config/config";
import axios from "axios";
import { mapState } from "vuex";

/*eslint-disable no-console*/

export default {
  mixins: [validationMixin],

  validations: {
    name: { required },
    description: { required }
  },

  data: () => ({
    dialog: false,
    name: "",
    rules: [v => !!v || "Content is required."],
    description: ""
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    ...mapState(["user"])
  },

  methods: {
    submit() {
      axios
        .post(API + "groups/", {
          users: [{ user: this.user._id, role: "admin" }],
          name: this.name,
          description: this.description
        })
        .then(() => {
          this.dialog = false;
          this.$emit("newGroup");
          this.clear();
        });
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.description = "";
    }
  }
};
</script>