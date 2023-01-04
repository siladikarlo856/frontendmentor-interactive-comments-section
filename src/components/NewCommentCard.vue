<template>
  <div class="new-comment-card-container">
    <div class="user-avatar-container">
      <img :src="imageUrl" alt="" class="new-comment-user-avatar" />
    </div>
    <div class="user-input-container">
      <textarea
        ref="textareaRef"
        @input="onChange"
        id="new-comment-content"
        name="new-comment-content"
        placeholder="Add a comment..."
        v-model="textAreaContent"
      />
    </div>
    <div class="button-container">
      <ButtonColor v-if="isNewCommentMode" @click="onSendClicked"
        >Send</ButtonColor
      >
      <ButtonColor v-if="isReplyMode" @click="onReplyClicked"
        >Reply</ButtonColor
      >
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onUnmounted,
  type TextareaHTMLAttributes,
} from "vue";
import ButtonColor from "./ButtonColor.vue";

export default defineComponent({
  name: "NewCommentCard",
  props: {
    username: { type: String },
    mode: { type: String, default: "new-comment" },
    replyTo: { type: String, default: "" },
  },
  components: { ButtonColor },
  emits: ["send", "reply", "valueChanged"],
  setup(props, context) {
    const textareaRef = ref<HTMLTextAreaElement>();

    const imageUrl = new URL(
      `../assets/images/avatars/image-${props.username}.png`,
      import.meta.url
    ).href;

    const textAreaContent = ref("");

    const isNewCommentMode = computed(() => props.mode === "new-comment");
    const isReplyMode = computed(() => props.mode === "reply");

    function adjustTextareaHeight() {
      textareaRef.value!.style.height = "auto";
      textareaRef.value!.style.height = textareaRef.value!.scrollHeight + "px";
    }

    function onChange(e: Event) {
      adjustTextareaHeight();
      context.emit("valueChanged", (e.target as TextareaHTMLAttributes).value);
    }

    function onSendClicked() {
      if (textAreaContent.value === "") {
        return;
      }
      context.emit("send", getReplyContent());
      textAreaContent.value = "";
    }

    function onReplyClicked() {
      if (textAreaContent.value === "") {
        return;
      }
      context.emit("reply", getReplyContent());
      textAreaContent.value = "";
    }

    function getReplyContent() {
      return textAreaContent.value;
    }

    onMounted(() => {
      adjustTextareaHeight();
      window.addEventListener("resize", adjustTextareaHeight);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", adjustTextareaHeight);
    });

    return {
      textareaRef,
      imageUrl,
      isNewCommentMode,
      isReplyMode,
      textAreaContent,
      onChange,
      onSendClicked,
      onReplyClicked,
    };
  },
});
</script>
<style scoped>
.new-comment-card-container {
  width: 100%;
  border-radius: 10px;
  background-color: white;
  padding: 1.5rem;

  display: flex;
  flex-direction: row;
  margin-bottom: 1.5rem;
}

.new-comment-user-avatar {
  height: 3rem;
}

.user-input-container {
  flex-grow: 1;
  margin: 0 1rem;
}

.user-input-container textarea {
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/

  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius-small);
  padding: 1em;

  width: 100%;
  height: fit-content;
  font-family: Rubik, sans-serif;
  font-size: var(--p-font-size);
  color: var(--color-dark-blue);

  cursor: pointer;
  overflow: hidden;
}

.user-input-container textarea:hover {
  border-color: var(--color-moderate-blue);
}
</style>
