<template>
  <v-navigation-drawer permanent app>
    <wm-avatar></wm-avatar>
    {{user.nome}}
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" link>
        <router-link :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import Avatar from "./Avatar";
import { mapState } from "vuex";

export default {
  components: {
    "wm-avatar": Avatar
  },
  data() {
    return {
      ht: 50,
      wd: 150,
      items: [
        { title: "Home", icon: "mdi-home-city", link: "/" },
        { title: "My Account", icon: "mdi-account", link: "/groups" },
        { title: "Users", icon: "mdi-account-group-outline", link: "/groups" }
      ],
      mini: true
    };
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>