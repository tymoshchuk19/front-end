<template>
  <v-container fluid fill-height class="ma-0 pa-0">
    <v-layout text-center wrap>
      <v-row no-gutters>
        <v-col cols="2">
          <List
            :userData="userData"
            :conversations="conversations"
            v-on:select-conversation="currentConversation = $event"
            v-on:new-conversation="getConversations"
          />
        </v-col>
        <v-col cols="7" class="grey lighten-2 relative full-height">
          <div class="msger">
            <div id="chat-col" class="chat-overflow" v-chat-scroll>
              <Logs :messages="messages" />
            </div>
            <v-footer color>
              <v-btn class="ml-3" icon color="primary">
                <v-icon class="mr-3" size="37" color="primary"
                  >mdi-plus-circle</v-icon
                >
              </v-btn>
              <v-text-field
                v-model="message"
                rounded
                outlined
                dense
                hide-details
                placeholder="Escreve uma mensagem"
                v-on:keyup.enter="postMessage(message)"
              ></v-text-field>
              <v-btn
                class="ml-3"
                icon
                color="primary"
                v-on:click="postMessage(message)"
              >
                <v-icon size="37">mdi-send-circle</v-icon>
              </v-btn>
            </v-footer>
          </div>
        </v-col>
        <v-col cols="3">
          <Profile />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import { API } from "../../config/config";

import axios from "axios";

import Logs from "./Logs";
import List from "./List";
import Profile from "./Profile";
export default {
  name: "Chat",

  components: {
    Logs,
    List,
    Profile
  },
  mounted() {
    this.getConversations();
    this.getMessages();
    this.getMessagesTimer();
    this.getUserData();
  },
  data() {
    return {
      conversations: null,
      currentConversation: null,
      messages: null,
      message: null,
      userData: null
    };
  },
  methods: {
    getConversations() {
      axios.get(`${API}conversations`).then(({ data }) => {
        this.conversations = data;
        this.currentConversation = data[0]._id;
      });
    },
    getMessages() {
      if (this.currentConversation) {
        axios
          .get(`${API}conversations/${this.currentConversation}/messages`)
          .then(({ data }) => {
            this.messages = data;
          });
      }
    },
    postMessage(message) {
      if (message) {
        axios
          .post(`${API}conversations/${this.currentConversation}/messages`, {
            content: message,
            type: "text"
          })
          .then(this.getMessages);
        this.message = "";
      }
    },
    getMessagesTimer() {
      setInterval(() => {
        this.getMessages();
      }, 3000);
    },
    getUserData() {
      axios.get(`${API}users/${this.user}`).then(({ data }) => {
        this.userData = data;
      });
    }
  }
};
</script>

<style>
.full-height {
  height: 91.2vh;
  /* height: 96.2vh; */
}

.chat-height {
  height: auto;
}

.rounded-card {
  border-radius: 50px !important;
}

.chat-background {
  background-color: aqua;
}

.relative {
  position: relative;
}

.chat-overflow {
  flex: 1;
  overflow-y: scroll;
}

html {
  overflow-y: hidden;
}

body {
  height: 100vh;
}

.chat-sticky {
  position: fixed !important;
}

.msger {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
</style>
