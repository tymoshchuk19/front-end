<template>
  <div class="footer">
    <v-footer class="secondary" padless height="40" app>
      <v-col class="text-center" cols="12">
        <div class="text-center">
          <!-- -->
          <v-bottom-sheet v-model="chat" fullscreen>
            <template v-slot:activator="{ on }">
              <v-btn class="mb-3 pb-5" v-on="on" text>
                <strong class="white--text">Chat </strong>
                <v-icon class="ml-1" color="white">mdi-chat</v-icon>
              </v-btn>
            </template>
            <v-btn class="mt-12" tile color="error" @click="chat = !chat"
              >close</v-btn
            >

            <Chat />
          </v-bottom-sheet>
          <!-- -->
        </div>
        <!-- <strong>Chat</strong>
        <v-icon>mdi-chat</v-icon>-->
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import Chat from "./Chat";
export default {
  components: {
    Chat
  },
  data: () => ({
    chat: false
  })
};
</script>
