<template>
   <v-list-item class="px-2">
        <v-list-item-avatar
          link
        >
          <v-img src="https://scontent.fopo1-1.fna.fbcdn.net/v/t31.0-1/c25.0.100.100a/p100x100/1232980_317180055124740_2248433128634441547_o.jpg?_nc_cat=102&_nc_ohc=hUdr1bIfKMEAX9iQFkO&_nc_ht=scontent.fopo1-1.fna&_nc_tp=1003&oh=0e9cc0ee6c92cb02c5e3903214d4aef3&oe=5EDBA4F3"></v-img>
        </v-list-item-avatar>
        <v-row>
          <v-col>
            <v-icon link>FD</v-icon>
          </v-col>
          <v-col link>
            <v-icon link>GR</v-icon>
          </v-col>
          <v-col link>
            <v-icon link>CA</v-icon>
          </v-col>
        </v-row>
        
        <v-btn
          icon
          @click.stop="miniFunc"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
    </v-list-item>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    methods: {
      miniFunc: function(){
        this.$emit('miniBar');
      }
    }
}
</script>