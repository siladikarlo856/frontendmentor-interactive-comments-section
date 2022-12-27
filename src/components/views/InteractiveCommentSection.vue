<template>
  <div class="container">
    <CommentCard :ownedByCurrentUser="false" />
    <NewCommentCard buttonText="Reply" />
    <CommentCard :ownedByCurrentUser="true" />
    <ReplySection />
    <NewCommentCard buttonText="Send" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommentCard from "./CommentCard.vue";
import NewCommentCard from "./NewCommentCard.vue";
import ReplySection from "./ReplySection.vue";

export default defineComponent({
  name: "InteractiveCommentSection",
  components: {
    CommentCard,
    NewCommentCard,
    ReplySection,
  },
  // props: {},
  setup() {
    return {};
  },
});
</script>

<style>
.container {
  width: 50vw;
  margin-top: 1.5rem;
}
</style>
