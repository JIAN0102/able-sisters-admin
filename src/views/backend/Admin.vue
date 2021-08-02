<template>
  <div>
    <h1>後台 h1</h1>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/backend/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
    };
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    this.$http.post(api)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/all-backend.scss";
</style>
