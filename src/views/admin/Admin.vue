<template>
  <div>
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/admin/Navbar.vue';

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
        console.log(res);
        // if (!res.data.success) {
        //   this.$router.push('/login');
        // }
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
