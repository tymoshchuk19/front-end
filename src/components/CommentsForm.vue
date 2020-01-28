<template>
  <v-card class="pr-2 pl-2 pb-2 ml-5">
    <form>
      <v-textarea
        counter
        outlined
        v-model="body"
        label="Comment"
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
    props: ['postid'],
    validations: {
      body: { required }
    },

    data: () => ({
      body: '',
      rules: [v => !!v || 'Comment is required.']
    }),

    methods: {
      submit () {
        axios.post(API + 'posts/' + this.postid + '/comments', {
            author: USER,
            body: this.body
      })
        .then(() => { 
          this.$emit('newComment'); 
          this.clear()
        });
      },
      clear () {
        this.$v.$reset()
        this.body = ''
      }
    }
  }
</script>