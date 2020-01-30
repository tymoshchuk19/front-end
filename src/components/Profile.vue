<template>
  <v-card class="pa-2 full-height" flat tile>
    <br />
    <v-avatar color="indigo" size="100" class="rounded-card">
      <v-img src="/img/prh.jpg"></v-img>
    </v-avatar>
    <h1>Grupo de PLC</h1>
    <br />
    <v-expansion-panels flat hover multiple accordion>
      <v-expansion-panel key="1">
        <v-expansion-panel-header>Opções</v-expansion-panel-header>
        <v-expansion-panel-content color="grey lighten-2">PlaceHolder</v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel key="2">
        <v-expansion-panel-header>Privacidade</v-expansion-panel-header>
        <v-expansion-panel-content color="grey lighten-2">PlaceHolder</v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel key="3">
        <v-expansion-panel-header>Ficheiros Partilhados</v-expansion-panel-header>
        <v-expansion-panel-content color="grey lighten-2">PlaceHolder</v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  name: "Profile"
};
</script>

<style>
</style>