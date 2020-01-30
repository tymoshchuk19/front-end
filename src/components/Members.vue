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
      </v-card>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
/*eslint-disable no-console*/
  export default {
    props: ['members'],
    data () {
      return {
      }
    }
  }
</script>