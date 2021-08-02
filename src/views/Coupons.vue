<template>
  <Loading :active="isLoading" />
  <div />
</template>

<script>
export default {
  data() {
    return {
      coupons: [],
    };
  },
  created() {
    this.getCoupons();
  },
  mounted() {},
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>
