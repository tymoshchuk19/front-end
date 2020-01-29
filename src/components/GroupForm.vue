<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn block tile color="primary" dark v-on="on">
          <v-list-item-avatar size="20" color="primary">
            <v-img src="https://scontent.fopo1-1.fna.fbcdn.net/v/t31.0-1/c25.0.100.100a/p100x100/1232980_317180055124740_2248433128634441547_o.jpg?_nc_cat=102&_nc_ohc=hUdr1bIfKMEAX9iQFkO&_nc_ht=scontent.fopo1-1.fna&_nc_tp=1003&oh=0e9cc0ee6c92cb02c5e3903214d4aef3&oe=5EDBA4F3">
            </v-img>
          </v-list-item-avatar>
          New Group
        </v-btn>
      </template>
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
          <v-btn color="primary darken-1" text @click="dialog = false">Close</v-btn>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
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
      dialog: false,
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