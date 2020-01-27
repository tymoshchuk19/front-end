<template>
  <v-app>
    <v-content>
      <v-row>
          <v-col cols="1">
            <wm-sidebar></wm-sidebar>
          </v-col> 
          <v-col cols="11">
            <router-view></router-view>
          </v-col> 
      </v-row>
      <wm-footer></wm-footer>
    </v-content>
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";

export default {
  name: 'App',
  components: {
    'wm-footer': Footer,
    'wm-sidebar': SideBar
  },
  data: () => ({
    //
  }),
};
</script>
