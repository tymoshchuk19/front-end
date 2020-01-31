<template>
  <v-expansion-panels>
    <v-expansion-panel
    class="primary white--text"
      v-for="(member,i) in members"
      :key="i"
    >
      <v-card>
          <v-list-item-avatar v-on="on" size="20" color="primary">
            <img :src="member.user.image" :alt="member.user.nome" />
          </v-list-item-avatar>
          {{member.user.nome}}
          <v-btn 
            v-if="perms"
            icon 
            color="red"
            @click="deleteMember(group + '/members/' + member.user._id)" 
            >
                <v-icon size="20">mdi-close-circle</v-icon>
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
    props: ['members','perms','group'],
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
    }
  }
</script>