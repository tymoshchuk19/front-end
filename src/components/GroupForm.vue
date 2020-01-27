<template>
  <v-card class="pr-2 pl-2 pb-2 mb-4">
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        label="Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-textarea
        counter
        outlined
        v-model="description"
        label="Description"
        :rules="rules"
      ></v-textarea>

      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </v-card>
</template>


<script>
  import { validationMixin } from 'vuelidate';
  import { required } from 'vuelidate/lib/validators';
  import { USER, API } from '../../config/config';
  import axios from "axios";

  /*eslint-disable no-console*/

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required },
      description: { required }
    },

    data: () => ({
      name: '',
      rules: [v => !!v || 'Content is required.'],
      description: ''
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      }
    },

    methods: {
      submit () {
        axios.post(API + 'groups/' , {
            users: [ { user: USER, role: 'admin' } ],
            name: this.name,
            description: this.description
      })
        .then(() => { 
          this.$emit('newGroup'); 
          this.clear()
        });
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.description = ''
      },
    }
  }
</script>