<template>
  <div class="comment-parser-container">
    <CommentCard
      :username="comment.user.username"
      :created-at="comment.createdAt"
      :owned-by-current-user="isOwnedByCurrentUser"
      :score="comment.score"
      @score-updated="(score) => onScoreUpdated(comment.id, score)"
      :commentContent="comment.content"
      @reply="(replyContent: string) => onReplyClicked(comment.id, replyContent)"
    />
    <div
      class="reply-section-container"
      s
      v-for="reply in comment.replies"
      :key="reply.id"
    >
      <div class="reply-decoration-line-container">
        <span class="reply-decoration-line"></span>
      </div>
      <div class="replies-container">
        <CommentCard
          :username="reply.user.username"
          :created-at="reply.createdAt"
          :ownedByCurrentUser="isReplyOwnedByCurrentUser(reply)"
          :score="reply.score"
          :comment-content="reply.content"
          @reply="(replyContent: string) => onReplyClicked(comment.id, replyContent)"
          @score-updated="
            (score) => onReplyScoreUpdated(comment.id, reply.id, score)
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import type { PropType } from "vue";

import CommentCard from "./CommentCard.vue";

import type { User } from "@/types/User";
import type { Comment } from "@/types/Comment";
import type { Reply } from "@/types/Reply";

export default defineComponent({
  name: "CommentParser",
  props: {
    user: { type: Object as PropType<User>, required: true },
    comment: { type: Object as PropType<Comment>, required: true },
  },
  components: { CommentCard },
  emits: ["score-updated", "reply-score-updated", "new-reply"],
  setup(props, context) {
    const isOwnedByCurrentUser = computed(
      () => props.user.username === props.comment.user.username
    );

    function isReplyOwnedByCurrentUser(reply: Reply) {
      return props.user.username === reply.user.username;
    }

    function onScoreUpdated(id: number, score: number) {
      context.emit("score-updated", id, score);
    }

    function onReplyScoreUpdated(
      commentId: number,
      replyId: number,
      score: number
    ) {
      context.emit("reply-score-updated", commentId, replyId, score);
    }

    function onReplyClicked(commentId: number, replyContent: string) {
      console.log("parser onReply", commentId, replyContent);

      context.emit("new-reply", commentId, replyContent);
    }
    return {
      isOwnedByCurrentUser,
      isReplyOwnedByCurrentUser,
      onScoreUpdated,
      onReplyScoreUpdated,
      onReplyClicked,
    };
  },
});
</script>
<style scoped>
.comment-parser-container {
  width: 100%;
  text-align: center;
}

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
  height: 100%;
  border: 1px solid var(--light-gray);
}

.reply-section-container:last-child .reply-decoration-line {
  height: auto;
}
</style>
