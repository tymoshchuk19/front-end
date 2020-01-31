<template>
  <v-card class="pa-2 full-height chat-overflow" flat tile>
    <v-list two-line>
      <v-header>
        Conversas
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn class="ml-3" icon color="primary" v-on="on">
              <v-icon size="37" color="primary">mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <v-card class="pa-2">
            <v-card-title class="headline grey lighten-2 mb-2" primary-title
              >Adicionar Conversa</v-card-title
            >
            <v-text-field
              v-model="cvName"
              label="Nome da coversa"
            ></v-text-field>
            <v-select
              v-model="cvUsers"
              :items="getFriends(userData.friends)"
              label="Adicione amigos"
              multiple
              chips
            ></v-select>

            <v-select
              v-model="cvImage"
              :items="getFriendsAvatar(userData.friends)"
              label="Qual a imagem"
              chips
            ></v-select>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="createConversation"
                >Criar Conversa</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-header>
      <v-list-item-group v-model="current">
        <v-list-item
          v-for="cv in conversations"
          :key="cv._id"
          @click="$emit('select-conversation', cv._id)"
        >
          <v-list-item-avatar>
            <v-img :src="cv.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content class="text-left">
            <v-list-item-title v-html="cv.name"></v-list-item-title>
            <v-list-item-subtitle v-html="cv.name"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
/* eslint-disable no-console */

import axios from "axios";
import { API } from "../../config/config";

export default {
  name: "List",
  props: {
    conversations: Array
  },
  data() {
    return {
      current: 0,
      cvUsers: null,
      cvImage: null,
      cvName: null,
      userData: this.$store.state.user
    };
  },
  methods: {
    getFriends(friendData) {
      return friendData.map(friend => friend.nome);
    },
    getFriendsAvatar(friendData) {
      return friendData.map(friend => friend.image);
    },
    createConversation() {
      let users = this.userData.friends.filter(friend =>
        this.cvUsers.includes(friend.nome)
      );
      users.push(this.userData);
      let usersC = [];

      users = users.map(user => usersC.push({ user: user._id, role: "Admin" }));

      axios
        .post(`${API}conversations`, {
          name: this.cvName,
          avatar: this.cvImage,
          users: usersC
        })
        .then(() => {
          this.$emit("new-conversation");
        });
    }
  }
};
</script>

<style>
.icon {
  position: relative;
  margin: 14px;
  height: 60px;
  width: 60px;
  border-radius: 10px !important;
  -webkit-box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
  font-weight: 900;
  font-size: 12px;
  line-height: 52px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  background-color: rgb(23, 209, 157);
  box-shadow: rgba(23, 209, 157, 0.5) 0px 6px 20px;
  color: rgb(243, 243, 243);
}
.icon .icon-delete-btn {
  display: block;
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 7px;
  right: 6px;
  top: 6px;
  border: 1px solid hsla(0, 0%, 100%, 0.4);
  background: hsla(0, 0%, 100%, 0.2);
}
</style>
