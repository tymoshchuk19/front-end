<template>
  <v-list-item class="px-2">
    <v-list-item-avatar link>
      <v-img :src="user.image"></v-img>
    </v-list-item-avatar>
    <v-row>
      <v-col>
        <v-icon link>FD</v-icon>
      </v-col>
      <v-col link>
        <v-icon link>GR</v-icon>
      </v-col>
      <v-col link>
        <v-icon link>CA</v-icon>
      </v-col>
    </v-row>

    <v-btn icon @click.stop="miniFunc">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    miniFunc: function() {
      this.$emit("miniBar");
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>