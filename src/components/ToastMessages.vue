<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0">
    <Toast
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast,
  },
  inject: ['emitter'],
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    this.emitter.on('send-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
    });
  },
};
</script>
