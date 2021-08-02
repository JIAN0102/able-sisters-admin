<template>
  <div
    ref="toast"
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header">
      <span
        class="p-2 rounded me-2 d-inline-block"
        :class="`bg-${message.style}`"
      />
      <strong class="me-auto">{{ message.title }}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      />
    </div>
    <div
      v-if="message.content"
      class="toast-body"
    >
      {{ message.content }}
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  props: {
    message: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 6000,
    });
    toast.show();
  },
};
</script>
