<template>
  <div class="container">
    <CommentParser
      v-for="comment in commentsStore._comments"
      :key="comment.id"
      :user="currentUser"
      :comment="comment"
      @score-updated="onScoreUpdated"
      @reply-score-updated="onReplyScoreUpdated"
      @new-reply="onNewReply"
    />
    <NewCommentCard
      :username="currentUser.username"
      mode="new-comment"
      @send="onSendClicked"
    />
  </div>
  <DeleteModal v-if="isModalVisible" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommentParser from "../CommentParser.vue";
import NewCommentCard from "../NewCommentCard.vue";
import DeleteModal from "../DeleteModal.vue";

import { useCommentsStore } from "@/stores/commentsStore";
import { useModalStore } from "@/stores/modalStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "InteractiveCommentSection",
  components: { CommentParser, NewCommentCard, DeleteModal },
  // props: {},
  setup() {
    const commentsStore = useCommentsStore();
    const modalStore = useModalStore();

    const { isModalVisible } = storeToRefs(modalStore);

    function onSendClicked(content: string) {
      console.log("send:", content);
      commentsStore.addNewComment({
        id: -1,
        content: content,
        createdAt: "just now",
        score: 0,
        user: commentsStore.currentUser,
        replies: [],
      });
    }

    function onScoreUpdated(id: number, score: number) {
      commentsStore.updateScoreById(id, score);
    }

    function onNewReply(commentId: number, replyContent: string) {
      commentsStore.addReplyToCommentById(commentId, replyContent);
    }

    function onReplyScoreUpdated(
      commentId: number,
      replyId: number,
      score: number
    ) {
      commentsStore.updateReplyScoreById(commentId, replyId, score);
    }

    return {
      isModalVisible,
      currentUser: commentsStore.currentUser,
      commentsStore,
      onSendClicked,
      onScoreUpdated,
      onReplyScoreUpdated,
      onNewReply,
    };
  },
});
</script>

<style>
.container {
  width: 80vw;
  margin-top: 1.5rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media only screen and (max-width: 600px) {
  .container {
    width: 95vw;
  }
}
</style>
