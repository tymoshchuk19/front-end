<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(task,i) in tasks"
      :key="i"
    >
      <v-expansion-panel-header>{{task.title}} | {{task.date}}</v-expansion-panel-header>
      <v-expansion-panel-content>
        [{{task.group}}]
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
/*eslint-disable no-console*/
  export default {
    props: ['tasks'],
    data () {
      return {
      }
    }
  }
</script>