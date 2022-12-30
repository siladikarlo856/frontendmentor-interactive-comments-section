<template>
  <div class="comment-card-container">
    <div class="score-container"><VoteCounter v-model="voteCount" /></div>
    <div class="content-container">
      <div class="user-buttons-container">
        <div class="user-info-container">
          <img :src="imageUrl" alt="" class="user-avatar" />
          <div class="username">{{ username }}</div>
          <div v-if="ownedByCurrentUser" class="you-badge">you</div>
          <div class="created-at">{{ createdAt }}</div>
        </div>
        <div class="action-buttons-container">
          <ButtonIconText
            v-if="ownedByCurrentUser"
            :text-color="colors.primary.softRed"
            @click="onDeleteClicked"
            ><template #icon><IconDelete /></template>Delete</ButtonIconText
          >
          <ButtonIconText
            v-if="ownedByCurrentUser"
            :text-color="colors.primary.moderateBlue"
            @click="onEditClicked"
            ><template #icon><IconEdit /></template>Edit</ButtonIconText
          >
          <ButtonIconText
            v-if="!ownedByCurrentUser"
            :text-color="colors.primary.moderateBlue"
            @click="onReplyClicked"
            ><template #icon><IconReply /></template>Reply</ButtonIconText
          >
        </div>
      </div>
      <div class="content">
        <textarea
          :value="commentContent"
          @input="onChange"
          :readonly="isPreviewMode"
          :class="{
            'textarea__preview-mode': isPreviewMode,
            'textarea__edit-mode': isEditMode,
          }"
          ref="textareaRef"
          placeholder="Add a comment..."
        ></textarea>
      </div>
      <div class="update-button-container" v-if="isEditMode">
        <ButtonColor @click="onUpdateButtonClicked">Update</ButtonColor>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
  type TextareaHTMLAttributes,
} from "vue";
import VoteCounter from "./VoteCounter.vue";
import ButtonColor from "./ButtonColor.vue";
import ButtonIconText from "./ButtonIconText.vue";
import IconReply from "./icons/IconReply.vue";
import IconDelete from "./icons/IconDelete.vue";
import IconEdit from "./icons/IconEdit.vue";
import { colors } from "@/config";
export default defineComponent({
  name: "CommentCard",
  props: {
    username: { type: String },
    createdAt: { type: String },
    ownedByCurrentUser: { type: Boolean, default: false },
    commentContent: { type: String },
    editorMode: { type: String },
  },
  components: {
    VoteCounter,
    ButtonColor,
    ButtonIconText,
    IconReply,
    IconDelete,
    IconEdit,
  },
  setup(props, context) {
    const voteCount = ref(0);

    const textareaRef = ref<HTMLTextAreaElement>();

    const imageUrl = new URL(
      `../assets/images/avatars/image-${props.username}.png`,
      import.meta.url
    ).href;

    const isPreviewMode = computed(() => props.editorMode === "preview");
    const isEditMode = computed(() => props.editorMode === "edit");

    function onReplyClicked() {
      console.log("Reply clicked");
    }
    function onDeleteClicked() {
      console.log("delete clicked");
    }
    function onEditClicked() {
      console.log("edit clicked");
      context.emit("open-edit-mode");
      nextTick().then(() => {
        adjustTextareaHeight();
      });
    }

    function onUpdateButtonClicked() {
      context.emit("update");
    }

    function onChange(e: Event) {
      context.emit("valueChanged", (e.target as TextareaHTMLAttributes).value);
    }

    function adjustTextareaHeight() {
      textareaRef.value!.style.height = "auto";
      textareaRef.value!.style.height = textareaRef.value!.scrollHeight + "px";
    }

    onMounted(() => {
      adjustTextareaHeight();
      window.addEventListener("resize", adjustTextareaHeight);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", adjustTextareaHeight);
    });

    return {
      imageUrl,
      textareaRef,
      colors,
      voteCount,
      isPreviewMode,
      isEditMode,
      onReplyClicked,
      onDeleteClicked,
      onEditClicked,
      onUpdateButtonClicked,
      adjustTextareaHeight,
      onChange,
    };
  },
});
</script>
<style scoped>
.comment-card-container {
  width: 100%;
  border-radius: var(--border-radius-medium);
  background-color: var(--color-white);
  padding: var(--padding-medium);

  display: flex;
  flex-direction: row;
  margin-bottom: var(--margin-medium);
}

.score-container {
  margin-right: var(--margin-medium);
}

.content-container {
  flex-grow: 1;
}

.user-buttons-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  margin-bottom: var(--margin-small);
}

.user-info-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user-avatar {
  height: 2.5rem;
  margin-right: var(--margin-small);
}

.username {
  color: var(--color-dark-blue);
  font-weight: var(--font-weight-medium);
  margin-right: var(--margin-small);
}

.you-badge {
  margin-right: 1rem;
  background-color: var(--color-moderate-blue);
  border-radius: 2px;
  color: var(--color-white);
  padding: 0.1rem 0.3rem;
  font-size: 0.8rem;
}

.action-buttons-container {
  display: flex;
  gap: var(--margin-small);
}

.content {
  flex-grow: 1;
}

textarea {
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/
  font-family: Rubik, sans-serif;
  font-size: var(--p-font-size);

  width: 100%;
  height: fit-content;
  border-radius: var(--border-radius-small);
  overflow: hidden;
}

.textarea__preview-mode {
  cursor: default;
  border: none;
  padding: 0;
  color: var(--grayish-blue);
}

.textarea__edit-mode {
  cursor: pointer;
  border: 1px solid var(--light-gray);
  padding: var(--padding-small);
  color: var(--color-dark-blue);
}

textarea:hover {
  border-color: var(--color-moderate-blue);
}

.update-button-container {
  display: flex;
  justify-content: end;
  margin-top: var(--margin-small);
}
</style>
