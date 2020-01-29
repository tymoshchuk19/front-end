<template>
    <div class="text-center">
        <v-btn @click="logout" color="primary">
            <span class="white--text">Sign Out</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    methods: {
      logout() {
        axios.get('logout')
            .then(() => {
            this.$router.push('/login')
            })
      }
    }
}
</script>