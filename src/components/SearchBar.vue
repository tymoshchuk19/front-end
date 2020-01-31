<template>
  <diV class="d-flex input-width custom-placeholer-color">
    <v-autocomplete
      background-color="grey darken-1"
      rounded
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      hide-no-data
      hide-selected
      hide-details
      item-text="nome"
      item-value="API"
      placeholder="Search profile"
      append-icon
      return-object
    ></v-autocomplete>
    <v-btn
      color="pa-0 transparent"
      depressed
      @click="() => {$router.push({path: `/users/${model._id}`})}"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </diV>
</template>

<script>
/* eslint-disable no-console*/
/* eslint-disable no-unused-vars */
import { API } from "../../config/config";
import axios from "axios";

export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      return this.entries;
    }
  },

  watch: {
    search(val) {
      if (this.items.length > 0) return;

      if (this.isLoading) return;

      this.isLoading = true;

      axios
        .get(`${API}users`)
        .then(({ data }) => {
          this.count = data.length;
          this.entries = data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

<style>
</style>

<style >
.input-width {
  min-width: 700px;
}
.custom-placeholer-color input::placeholder {
  color: whitesmoke !important;
  opacity: 1;
}
</style>