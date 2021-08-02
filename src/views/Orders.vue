<template>
  <Loading :active="isLoading" />
  <table class="table mt-3">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr />
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orders: [],
    };
  },
  created() {
    this.getOrders();
  },
  mounted() {},
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            console.log(res);
            this.orders = res.data.orders;
          }
          this.isLoading = false;
        });
    },
  },
};
</script>
