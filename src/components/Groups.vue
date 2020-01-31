<template>
  <v-card tile color="indigo darken-1 ml-2 pa-2">
    <router-link
      v-for="(group, i) in groups"
      :key="i"
      :to="{ path: '/groups/' + group._id }"
    >
      <v-card class="ma-2 mt-2">
        <v-btn text>{{ group.name }}</v-btn>
      </v-card>
    </router-link>
  </v-card>
</template>

<script>
export default {
  props: ["groups"],
  data() {
    return {};
  }
};
</script>
