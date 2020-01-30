<template>
  <v-expansion-panels>
    <v-expansion-panel
    class="primary white--text"
      v-for="(task,i) in tasks"
      :key="i"
    >
      <v-expansion-panel-header>
        <v-btn 
          v-if="perms"
          icon 
          color="red"
          @click="deleteTask(task.group._id + '/tasks/' + task._id)" 
        >
            <v-icon size="30">mdi-close-circle</v-icon>
        </v-btn>
        {{task.title}} | {{task.date}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        [{{task.group.name}}]
        <span> Descrição: {{task.description}} </span>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { API } from "../../config/config";
import axios from "axios";
/*eslint-disable no-console*/
  export default {
    props: ['tasks','perms'],
    data () {
      return {
      }
    },
    methods: {
      deleteTask(path) {
        axios
          .delete(API + "groups/" + path)
          .then(() => 
            this.$emit('newTask')
          );
      }
    }
  }
</script>