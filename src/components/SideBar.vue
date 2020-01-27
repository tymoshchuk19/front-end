<template>
    <v-navigation-drawer
      v-model="drawer"
      permanent
      app
    >
      <wm-avatar v-on:miniBar="mini = !mini"></wm-avatar>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
        <router-link :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon></router-link>
       
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
import Avatar from './Avatar'
  export default {
    components: {
      'wm-avatar': Avatar,
    },
    data () {
      return {
        ht: 50,
        wd: 150,
        items: [
          { title: 'Home', icon: 'mdi-home-city', link:"/" },
          { title: 'My Account', icon: 'mdi-account', link:"/groups" },
          { title: 'Users', icon: 'mdi-account-group-outline', },
        ],
        mini: true,
      }
    }
  }
</script>