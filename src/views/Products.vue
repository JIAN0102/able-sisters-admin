<template>
  <Loading :active="isLoading" />
  <div class="text-end">
    <button
      type="button"
      class="btn btn-primary"
      @click="openProductModal('create')"
    >
      新增產品
    </button>
  </div>
  <table class="table mt-3">
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
          {{ $filters.currency(product.origin_price) }}
        </td>
        <td class="text-right">
          {{ $filters.currency(product.price) }}
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
              @click="openProductModal('edit', product)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDeleteModal(product)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination
    :pagination="pagination"
    @update-page="getProducts"
  />
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  />
  <DeleteModal
    ref="deleteModal"
    :product="tempProduct"
    @delete-product="deleteProduct"
  />
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    ProductModal,
    DeleteModal,
    Pagination,
  },
  inject: ['emitter'],
  data() {
    return {
      isLoading: false,
      products: [],
      pagination: {},
      tempProduct: {},
      type: '',
      productModalComponent: null,
      deleteModalComponent: null,
    };
  },
  created() {
    this.getProducts();
  },
  mounted() {
    this.productModalComponent = this.$refs.productModal;
    this.deleteModalComponent = this.$refs.deleteModal;
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
          this.isLoading = false;
        });
    },
    updateProduct(product) {
      this.isLoading = true;
      this.tempProduct = product;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      if (this.type === 'edit') {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${product.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          this.productModalComponent.hideModal();
          this.isLoading = false;
          if (res.data.success) {
            this.getProducts();
            this.emitter.emit('send-message', {
              style: 'success',
              title: '更新成功',
            });
          } else {
            this.emitter.emit('send-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、'),
            });
          }
        });
    },
    deleteProduct() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(api)
        .then((res) => {
          this.deleteModalComponent.hideModal();
          this.isLoading = false;
          this.emitter.emit('send-message', {
            style: 'success',
            title: '刪除成功',
          });
          if (res.data.success) {
            this.getProducts();
          } else {
            this.emitter.emit('send-message', {
              style: 'danger',
              title: '刪除失敗',
              content: res.data.message.join('、'),
            });
          }
        });
    },
    openProductModal(type, product) {
      if (type === 'create') {
        // this.tempProduct = {};
      } else if (type === 'edit') {
        this.tempProduct = { ...product };
      }
      this.type = type;
      this.productModalComponent.showModal();
    },
    openDeleteModal(product) {
      this.tempProduct = { ...product };
      this.deleteModalComponent.showModal();
    },
  },
};
</script>
