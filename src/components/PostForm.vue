<template>
  <v-card class="pr-2 pl-2 pb-2 mb-4">
    <form>
      <v-text-field
        v-model="title"
        :error-messages="titleErrors"
        label="Title"
        required
        @input="$v.title.$touch()"
        @blur="$v.title.$touch()"
      ></v-text-field>
      <v-textarea
        counter
        outlined
        v-model="body"
        label="Content"
        :rules="rules"
      ></v-textarea>
      <v-text-field
        v-model="tag"
        :error-messages="tagErrors"
        label="Tag"
        @input="$v.tag.$touch()"
        @blur="$v.tag.$touch()"
      ></v-text-field>

      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </v-card>
</template>


<script>
  import { validationMixin } from 'vuelidate';
  import { required } from 'vuelidate/lib/validators';
  import { USER } from '../../config/config';
  import axios from "axios";

  /*eslint-disable no-console*/

  export default {
    mixins: [validationMixin],
    props: ['api'],
    validations: {
      title: { required },
      body: { required },
      tag: { required }
    },

    data: () => ({
      title: '',
      rules: [v => !!v || 'Content is required.'],
      body: '',
      tag: '',
      api: null
    }),

    computed: {
      titleErrors () {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.required && errors.push('Title is required.')
        return errors
      },
      tagErrors () {
        const errors = []
        if (!this.$v.tag.$dirty) return errors
        return errors
      }
    },

    methods: {
      submit () {
        axios.post(this.api , {
          posted_by: USER,
          title: this.title,
          body: this.body,
          tags: [this.tag]
        })
        .then(() => { 
          this.$emit('newPost'); 
          this.clear()
        });
      },
      clear () {
        this.$v.$reset()
        this.title = ''
        this.body = ''
        this.tag = ''
      },
    }
  }
</script>