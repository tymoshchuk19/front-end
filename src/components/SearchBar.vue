<template>
  <diV class="d-flex">
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      color="white"
      hide-no-data
      hide-selected
      item-text="nome"
      item-value="API"
      placeholder="Search profile"
      prepend-icon="mdi-profile"
      return-object
    ></v-autocomplete>
    <v-btn
      :disabled="!model"
      color="grey darken-3"
      @click="() => {$router.push({path: `/users/${model._id}`})}"
    >
      Search
      <v-icon right>mdi-glass</v-icon>
    </v-btn>
    <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
      Clear
      <v-icon right>mdi-close-circle</v-icon>
    </v-btn>
    <!-- <v-card-actions>
      <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
        Clear
        <v-icon right>mdi-close-circle</v-icon>
      </v-btn>
    </v-card-actions>-->
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
      //   const ent = this.entries.map(entry => {
      //     const Description =
      //       entry.Description.length > this.descriptionLimit
      //         ? entry.Description.slice(0, this.descriptionLimit) + "..."
      //         : entry.Description;

      //     return Object.assign({}, entry, { Description });
      //   });
      //   console.log(ent);
      return this.entries;
    }
  },

  watch: {
    search(val) {
      if (this.items.length > 0) return;

      if (this.isLoading) return;

      this.isLoading = true;

      //   fetch("https://api.publicapis.org/entries")
      //     .then(res => res.json())
      //     .then(res => {
      //       const { count, entries } = res;
      //       this.count = count;
      //       this.entries = entries;
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     })
      //     .finally(() => (this.isLoading = false));

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