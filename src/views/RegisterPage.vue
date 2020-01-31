<template>
  <v-container fluid>
    <wm-workum></wm-workum>
    <v-row justify="center">
      <h4 class="secondary--text">Register:</h4>
    </v-row>
    <v-row justify="center" align="center">
      <form>
        <v-text-field
          v-model="name"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
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
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
        <wm-date @newDate="updateDate($event)" :datename="'Birthday Date'"></wm-date>
        <v-textarea
            counter
            outlined
            v-model="about"
            label="About"
            :rules="rules.required"
          ></v-textarea>
        <v-btn class="primary mr-4" text @click="register">Register</v-btn>
      </form>
    </v-row>
    <v-row justify="center">
      <v-col cols="2">
        <router-link :to="{ path: '/login' }">
          <v-btn block tile small outlined color="primary" dark >
            Login
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Workum from '../components/Workum';
import MWDate from '../components/Date';
import { API } from '../../config/config';
import axios from 'axios';

export default {
  components: {
    'wm-workum': Workum,
      'wm-date': MWDate
  },
  data() {
    return {
      show1: false,
      email: "example@mail",
      name: "Maria",
      bdate: '',
      password: "******",
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        }
    };
  },
  created(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        this.bdate = mm + '/' + dd + '/' + yyyy;
  },
  methods: {
      updateDate(updatedDate) {
        this.bdate = updatedDate;
      },
      register() {
        axios.post(API + 'register', { 
            email: this.email, 
            nome: this.name, 
            bDate: this.bdate,
            about: this.about, 
            password: this.password 
        })
          .then(() => {
              this.$router.push('/login');
          });
      },
    ...mapActions(["setUser"])
  }
};
</script>