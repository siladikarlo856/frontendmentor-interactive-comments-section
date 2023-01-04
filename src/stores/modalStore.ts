import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal-store", () => {
  const isModalVisible = ref(false);

  function showModal() {
    isModalVisible.value = true;
  }

  function hideModal() {
    isModalVisible.value = false;
  }

  return {
    isModalVisible,
    showModal,
    hideModal,
  };
});
