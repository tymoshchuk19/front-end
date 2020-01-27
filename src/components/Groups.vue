<template>
    <div>
      <div class="my-2" 
        v-for="(group,i) in groups"
        :key="i">
        <router-link :to="'groups/' + group._id">
          <v-btn text>{{ group.name }}</v-btn>
        </router-link>
      </div>
    </div>
</template>

<script>

export default {
  props: ['groups'],
  data() {
    return {
    }
  }
}
</script>