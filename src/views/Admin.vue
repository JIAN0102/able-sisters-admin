<template>
  <div>
    <Navbar />
    <div class="container py-5">
      <ToastMessages />
      <router-view />
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import Navbar from '@/components/Navbar.vue';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    Navbar,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    this.$http.post(api)
      .then((res) => {
        if (!res.data.success) {
          // this.$router.push('/');
          console.log('尚未登入');
        }
      });
  },
};
</script>
