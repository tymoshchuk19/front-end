<template>
  <v-card color="indigo darken-1 mr-3">
    <v-card-text>
      <p class="headline white-font">Tasks</p>
      <v-expansion-panels>
        <v-expansion-panel class="pa-0" v-for="(task, i) in tasks" :key="i">
          <v-expansion-panel-header>
            <v-list-item-content>
              <p class="day ma-0">{{ getDay(task.date) }}</p>
              <p class="month ma-0">{{ getMonth(task.date) }}</p>
            </v-list-item-content>
            <v-list-item>
              <p class="task-title ma-0">{{ task.title }}</p>
            </v-list-item>
            <v-btn
              v-if="perms"
              icon
              color="red"
              @click="deleteTask(task.group._id + '/tasks/' + task._id)"
            >
              <v-icon size="30">mdi-close-circle</v-icon>
            </v-btn>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>
              <span class="group-desc">Group</span>
              : {{ task.group.name }}
            </p>
            <p>
              <span class="group-desc">Description</span>
              : {{ task.description }}
            </p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>
<script>
/*eslint-disable no-console*/

import { API } from "../../config/config";
import axios from "axios";
import moment from "moment";

export default {
  props: ["tasks", "perms"],
  data() {
    return {};
  },
  methods: {
    deleteTask(path) {
      axios.delete(API + "groups/" + path).then(() => this.$emit("newTask"));
    },
    getDay(date) {
      return moment(date).format("DD");
    },
    getMonth(date) {
      return moment(date).format("MMM");
    }
  }
};
</script>

<style>
.day {
  color: black;
  font-size: 28px;
}

.month {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

.task-title {
  color: black;
  font-size: 16px;
  font-weight: medium;
}

.group-desc {
  font-weight: bold;
}

.white-font {
  color: white;
}
</style>
