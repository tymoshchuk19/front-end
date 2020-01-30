<template>
  <v-expansion-panels>
    <v-expansion-panel
    class="primary white--text"
      v-for="(friend,i) in friends"
      :key="i"
    >
      <v-card>
          <v-list-item-avatar v-on="on" size="20" color="primary">
            <img :src="friend.image" :alt="friend.nome" />
          </v-list-item-avatar>
          {{friend.nome}}
          <v-btn 
            v-if="perms"
            icon 
            color="red"
            @click="deleteMember(group + '/members/' + friend._id)" 
            >
                <v-icon size="20">mdi-close-circle</v-icon>
          </v-btn>
          <v-btn 
            v-if="perms"
            icon 
            color="green"
            @click="addMember(group + '/members/',friend.email)" 
            >
                <v-icon size="20">mdi-check-circle</v-icon>
          </v-btn>
      </v-card>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { API } from "../../config/config";
import axios from "axios";
/*eslint-disable no-console*/
  export default {
    props: ['friends','perms','group'],
    data () {
      return {
      }
    },
    methods: {
      deleteMember(path) {
        axios
          .delete(API + "groups/" + path)
          .then(() => 
            this.$emit('newMember')
          );
      },
      addMember(path, email) {
        axios
          .post(API + "groups/" + path,{
              members: [email]
          })
          .then(() => 
            this.$emit('newMember')
          );
      }
    }
  }
</script>