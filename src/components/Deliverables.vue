<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(item,i) in 5"
      :key="i"
    >
      <v-expansion-panel-header>TP {{i}}</v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet.
        </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>