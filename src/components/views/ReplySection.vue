<template>
  <div class="reply-section-container">
    <div class="reply-decoration-line-container">
      <span class="reply-decoration-line"></span>
    </div>
    <div class="replies-container">
      <CommentCard :ownedByCurrentUser="false" />
      <NewCommentCard buttonText="Reply" />
      <CommentCard :ownedByCurrentUser="true" />
      <EditCommentCard :ownedByCurrentUser="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommentCard from "./CommentCard.vue";
import NewCommentCard from "./NewCommentCard.vue";
import EditCommentCard from "./EditCommentCard.vue";

export default defineComponent({
  name: "ReplySection",
  components: {
    CommentCard,
    NewCommentCard,
    EditCommentCard,
  },
  //   props: {},
  setup() {},
});
</script>

<style>
.reply-section-container {
  display: grid;
  grid-template-columns: 10% 90%;
}

.reply-decoration-line-container {
  display: flex;
  justify-content: center;
}
.reply-decoration-line {
  margin-bottom: 1.5rem;

  border: 1px solid var(--light-gray);
}
</style>
