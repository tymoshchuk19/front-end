<template>
  <div class="footer">
    <v-footer class="secondary" padless app>
      <v-col class="text-center" cols="12">
        <div class="text-center">
          <!-- -->
          <v-bottom-sheet v-model="chat" fullscreen>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" text>
                <strong>Chat</strong>
                <v-icon>mdi-chat</v-icon>
              </v-btn>
            </template>
            <v-btn class="mt-12" flat color="error" @click="chat = !chat">close</v-btn>

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