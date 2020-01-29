<template>
  <div>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" placeholder="Password" />
    <button @click="login">button</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "pg41089@alunos.uminho.pt",
      password: "1"
    };
  },
  methods: {
    login() {
      this.setUser({ email: this.email, password: this.password }).then(() =>
        this.$router.push("/")
      );
    },
    ...mapActions(["setUser"])
  },
  conputed: {}
};
</script>

<style>
</style>