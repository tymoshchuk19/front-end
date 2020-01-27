<template>
  <div class="footer">
      <v-footer class="secondary" padless app>
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} - 
          <strong>Chat</strong>
          <v-icon>mdi-chat</v-icon>   
        </v-col>
      </v-footer>
  </div>
</template>

<script>
export default {
  name: 'footer'
}
</script>