<template>
  <div class="modal-container">
    <div class="modal-content">
      <h2>Delete comment</h2>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div class="modal-buttons-container">
        <ButtonColor
          :button-color="colors.neutral.grayishBlue"
          :button-color-on-hover="colors.neutral.lightGray"
          @click.stop="onDeleteCanceled"
          >No, cancel</ButtonColor
        >
        <ButtonColor
          :button-color="colors.primary.softRed"
          :button-color-on-hover="colors.primary.paleRed"
          @click.stop="onDeleteConfirmed"
          >Yes, delete</ButtonColor
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ButtonColor from "./ButtonColor.vue";
import { colors } from "@/config";
import { useModalStore } from "@/stores/modalStore";
import { useCommentsStore } from "@/stores/commentsStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "DeleteModal",
  components: { ButtonColor },
  setup() {
    const commentsStore = useCommentsStore();
    const { resetSelectedId, deleteSelected } = commentsStore;

    const modalStore = useModalStore();
    const { hideModal } = modalStore;

    function onDeleteCanceled() {
      resetSelectedId();
      hideModal();
    }

    function onDeleteConfirmed() {
      deleteSelected();
      hideModal();
    }

    return { colors, onDeleteCanceled, onDeleteConfirmed };
  },
});
</script>
<style scoped>
.modal-container {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: var(--color-white);
  width: 35ch;
  height: 20ch;
  margin: 20rem auto;
  padding: 20px;
  border-radius: var(--border-radius-medium);
}

h2 {
  color: var(--color-dark-blue);
  font-weight: var(--font-weight-medium);
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1rem;
}

.modal-buttons-container {
  display: flex;
  justify-content: space-evenly;
}
</style>
