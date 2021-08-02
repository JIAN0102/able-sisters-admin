<template>
  <div class="text-end">
    <button
      type="button"
      class="btn btn-primary"
      @click="openModal('create')"
    >
      新增產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">
          分類
        </th>
        <th>產品名稱</th>
        <th width="120">
          原價
        </th>
        <th width="120">
          售價
        </th>
        <th width="100">
          是否啟用
        </th>
        <th width="200">
          編輯
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
      >
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-right">
          {{ product.origin_price }}
        </td>
        <td class="text-right">
          {{ product.price }}
        </td>
        <td>
          <span
            v-if="product.is_enabled"
            class="text-success"
          >啟用</span>
          <span
            v-else
            class="text-muted"
          >未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', product)"
            >
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  />
</template>

<script>
import ProductModal from '@/components/admin/ProductModal.vue';

export default {
  components: {
    ProductModal,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      type: '',
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openModal(type, product) {
      if (type === 'create') {
        this.tempProduct = {};
      } else if (type === 'edit') {
        this.tempProduct = { ...product };
      }
      this.type = type;
      const productModalComponent = this.$refs.productModal;
      productModalComponent.showModal();
    },
    updateProduct(product) {
      this.tempProduct = product;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      const productModalComponent = this.$refs.productModal;
      if (this.type === 'edit') {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${product.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          console.log(res);
          productModalComponent.hideModal();
          this.getProducts();
        });
    },
  },
};
</script>
