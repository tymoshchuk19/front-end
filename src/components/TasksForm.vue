<template>
  <v-row justify="center" class="ml-0 mr-3">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn
          class="pa-0 button-width"
          color="indigo darken-1"
          tile
          dark
          v-on="on"
        >
          New Task
        </v-btn>
      </template>
      <v-card class="pl-2 pb-2 mb-2">
        <form>
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            label="Title"
            required
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          ></v-text-field>
          <v-textarea
            class="mr-2"
            counter
            outlined
            v-model="description"
            label="Description"
            :rules="rules"
          ></v-textarea>
          <wm-date
            @newDate="updateDate($event)"
            :datename="'Expiration Date'"
          ></wm-date>

          <v-btn class="primary mr-4" text rounded @click="submit"
            >submit</v-btn
          >
          <v-btn color="primary darken-1" text @click="dialog = false"
            >Close</v-btn
          >
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import MWDate from "../components/Date";
import axios from "axios";

/*eslint-disable no-console*/

export default {
  mixins: [validationMixin],
  props: ["taskApi"],
  components: {
    "wm-date": MWDate
  },
  validations: {
    title: { required },
    date: { required }
  },

  data: () => ({
    dialog: false,
    title: "",
    description: "",
    rules: [v => !!v || "Description is required."],
    date: ""
  }),
  created() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    this.date = mm + "/" + dd + "/" + yyyy;
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Title is required.");
      return errors;
    }
  },
  methods: {
    updateDate(updatedDate) {
      this.date = updatedDate;
    },
    submit() {
      axios
        .post(this.taskApi, {
          title: this.title,
          description: this.description,
          date: this.date
        })
        .then(() => {
          this.dialog = false;
          this.$emit("newTask");
          this.clear();
        });
    },
    clear() {
      this.$v.$reset();
      this.title = "";
      this.description = "";
      this.date = "";
    }
  }
};
</script>
