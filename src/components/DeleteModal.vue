<template>
  <div
    id="deleteModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      role="document"
    >
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 {{ product.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ product.title }}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('delete-product')"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  mixins: [modalMixin],
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      modal: {},
    };
  },
};
</script>
