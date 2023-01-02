<template>
  <div class="comment-parser-container">
    <CommentCard
      :username="comment.user.username"
      :created-at="comment.createdAt"
      :owned-by-current-user="isOwnedByCurrentUser"
      :score="comment.score"
      :commentContent="comment.content"
    />
    <div
      class="reply-section-container"
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

export default defineComponent({
  name: "CommentParser",
  props: {
    user: { type: Object as PropType<User> },
    comment: { type: Object as PropType<Comment> },
  },
  components: { CommentCard },
  setup(props) {
    const isOwnedByCurrentUser = computed(
      () => props.user.username === props.comment.user.username
    );

    function isReplyOwnedByCurrentUser(reply: Comment) {
      return props.user.username === reply.user.username;
    }
    return { isOwnedByCurrentUser, isReplyOwnedByCurrentUser };
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
