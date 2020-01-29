
<template>
  <v-card>
    <v-navigation-drawer
      class="primary"
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
        <v-list-item class="px-2">
          <router-link :to="{ path: '/' }">
            <v-list-item-avatar>
              <v-img :src="user.image"></v-img>
            </v-list-item-avatar>
          </router-link>

          <v-list-item-title 
            class="white--text">{{user.nome}}
          </v-list-item-title>

          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import { mapState } from "vuex";

export default {
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      mini: true,
    }
  },
  computed: {
    ...mapState(["user"])
  }
}
</script>