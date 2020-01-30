<template>
  <div>
    <Message
      v-for="(msg, i) in messages"
      :key="i"
      :user="user"
      :author="msg.author"
      :content="msg.content"
    />
  </div>
</template>

<script>
// import axios from "axios";
import Message from "./messages/Message";

export default {
  name: "Logs",
  components: {
    Message
  },
  props: {
    messages: Array
  },

  data() {
    return {
      user: this.$store.state.user._id
    };
  }
};
</script>

<style></style>
