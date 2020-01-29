<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn block tile color="primary" dark v-on="on">
          <v-list-item-avatar size="20" color="primary">
            <v-img src="https://scontent.fopo1-1.fna.fbcdn.net/v/t31.0-1/c25.0.100.100a/p100x100/1232980_317180055124740_2248433128634441547_o.jpg?_nc_cat=102&_nc_ohc=hUdr1bIfKMEAX9iQFkO&_nc_ht=scontent.fopo1-1.fna&_nc_tp=1003&oh=0e9cc0ee6c92cb02c5e3903214d4aef3&oe=5EDBA4F3">
            </v-img>
          </v-list-item-avatar>
          New Post
        </v-btn>
      </template>
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

          <v-btn class="primary mr-4" text @click="submit">Submit</v-btn>
          <v-btn color="primary darken-1" text @click="dialog = false">Close</v-btn>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
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
      dialog: false,
      title: '',
      rules: [v => !!v || 'Content is required.'],
      body: '',
      tag: '',
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
          this.dialog = false;
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