<template>
  <div class="comment-card-container">
    <div class="score-container">
      <VoteCounter v-model="voteCount" @update:modelValue="onScoreUpdated" />
    </div>

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
        @click="onReplyClicked(username)"
        ><template #icon><IconReply /></template>Reply</ButtonIconText
      >
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
  <NewCommentCard
    v-if="isReplyComponentVisible"
    :username="username"
    :reply-to="replyTo"
    mode="reply"
    @reply="onNewReply"
  />
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
import NewCommentCard from "./NewCommentCard.vue";
import { useModalStore } from "@/stores/modalStore";
import { useCommentsStore } from "@/stores/commentsStore";

export default defineComponent({
  name: "CommentCard",
  props: {
    id: { type: Number, required: true },
    username: { type: String, required: true },
    createdAt: { type: String },
    ownedByCurrentUser: { type: Boolean, default: false },
    score: { type: Number, required: true },
    commentContent: { type: String },
  },
  components: {
    VoteCounter,
    ButtonColor,
    ButtonIconText,
    IconReply,
    IconDelete,
    IconEdit,
    NewCommentCard,
  },
  emits: ["score-updated", "reply", "valueChanged", "update"],
  setup(props, context) {
    const voteCount = ref(props.score);
    const editorMode = ref("preview");
    const replyTo = ref("");
    const content = ref(props.commentContent);

    const textareaRef = ref<HTMLTextAreaElement>();

    const imageUrl = new URL(
      `../assets/images/avatars/image-${props.username}.png`,
      import.meta.url
    ).href;

    const isReplyComponentVisible = ref(false);

    const isPreviewMode = computed(() => editorMode.value === "preview");
    const isEditMode = computed(() => editorMode.value === "edit");

    const commentsStore = useCommentsStore();
    const { setSelectedId } = commentsStore;

    const modalStore = useModalStore();
    const { showModal } = modalStore;

    function onScoreUpdated(score: number) {
      context.emit("score-updated", score);
    }

    function onReplyClicked(replyToUsername: string) {
      console.log("Reply clicked");
      isReplyComponentVisible.value = true;
      replyTo.value = replyToUsername;
    }
    function onDeleteClicked() {
      setSelectedId(props.id);
      showModal();
    }
    function onEditClicked() {
      console.log("edit clicked");
      editorMode.value = "edit";
      nextTick().then(() => {
        adjustTextareaHeight();
      });
    }

    function onUpdateButtonClicked() {
      editorMode.value = "preview";
      context.emit("update", content.value);
    }

    function onChange(e: Event) {
      content.value = (e.target as TextareaHTMLAttributes).value as string;
      adjustTextareaHeight();
      context.emit("valueChanged", content.value);
    }

    function adjustTextareaHeight() {
      textareaRef.value!.style.height = "auto";
      textareaRef.value!.style.height = textareaRef.value!.scrollHeight + "px";
    }

    function onNewReply(newReplyText: string) {
      //TODO: create new reply
      console.log("comment card onNewReply", newReplyText);
      context.emit("reply", newReplyText);
      isReplyComponentVisible.value = false;
      replyTo.value = "";
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
      replyTo,
      isPreviewMode,
      isEditMode,
      isReplyComponentVisible,
      onScoreUpdated,
      onReplyClicked,
      onDeleteClicked,
      onEditClicked,
      onUpdateButtonClicked,
      adjustTextareaHeight,
      onChange,
      onNewReply,
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

  display: grid;
  grid-template-columns: 1fr 6fr 2fr;
  grid-auto-rows: min-content;
  gap: 1rem;
  margin-bottom: var(--margin-medium);
}

.score-container {
  grid-column: 1;
  grid-row: 1 / 3;
  width: 4rem;
  max-height: 10rem;
}

.user-info-container {
  grid-column: 2 / 5;
  grid-row: 1;
}

.action-buttons-container {
  grid-column: 2 / 5;
  grid-row: 1;
  justify-self: end;
}

.content {
  grid-column: 2 / 5;
  grid-row: 2;
  height: 100%;
}

.update-button-container {
  grid-column: 1 / 5;
  justify-self: end;
  margin: 0;
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

@media only screen and (max-width: 600px) {
  .comment-card-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr auto 1fr;
    gap: 1rem;
    align-items: center;
  }

  .score-container {
    grid-column: 1 / 3;
    grid-row: 3;
  }

  .user-info-container {
    grid-column: 1 / 5;
    grid-row: 1;
  }

  .action-buttons-container {
    grid-column: 3 / 5;
    grid-row: 3;
    justify-self: end;
  }

  .content {
    grid-column: 1 / 5;
    grid-row: 2;
    height: 100%;
  }

  .update-button-container {
    grid-column: 1 / 5;
    justify-self: end;
    margin: 0;
  }
}
</style>
