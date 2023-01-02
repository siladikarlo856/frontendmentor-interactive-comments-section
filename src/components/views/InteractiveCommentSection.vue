<template>
  <div class="container">
    <CommentParser
      v-for="comment in comments"
      :key="comment.id"
      :user="currentUser"
      :comment="comment"
    />
  </div>
  <NewCommentCard
    :username="currentUser.username"
    mode="new-comment"
    @send="onSendClicked"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import dataJson from "@/data/data.json";
import CommentParser from "../CommentParser.vue";
import NewCommentCard from "../NewCommentCard.vue";

export default defineComponent({
  name: "InteractiveCommentSection",
  components: { CommentParser, NewCommentCard },
  // props: {},
  setup() {
    const { currentUser, comments: commentsInitValue } = dataJson;

    const comments = ref(commentsInitValue);

    function onSendClicked(content: string) {
      console.log("send:", content);
      comments.value.push({
        id: 5,
        content: content,
        createdAt: "just now",
        score: 0,
        user: currentUser,
        replies: [],
      });
    }

    return { currentUser, comments, onSendClicked };
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
</style>
