<template>
  <v-container fluid>
    <wm-workum></wm-workum>
    <v-row justify="center">
      <h4 class="secondary--text">Login:</h4>
    </v-row>
    <v-row justify="center">
      <form>
        <v-text-field
          v-model="email"
          label="Email"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Normal with hint text"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-btn class="primary mr-4" text @click="login">Login</v-btn>
      </form>
    </v-row>
    <v-row justify="center">
      <v-col cols="2">
        <router-link :to="{ path: '/register' }">
          <v-btn block tile small outlined color="primary" dark >
            Register
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Workum from '../components/Workum'

export default {
  components: {
    'wm-workum': Workum
  },
  data() {
    return {
      show1: false,
      email: "example@alunos.uminho.pt",
      password: "******",
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        }
    };
  },
  methods: {
    login() {
      this.setUser({ email: this.email, password: this.password }).then(() =>
        this.$router.push("/")
      );
    },
    ...mapActions(["setUser"])
  }
};
</script>

<style>
</style>