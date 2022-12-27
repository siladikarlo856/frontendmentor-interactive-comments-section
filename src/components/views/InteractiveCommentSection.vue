<template>
  <CommentCard :ownedByCurrentUser="false" />
  <CommentCard :ownedByCurrentUser="true" />
  <NewCommentCard />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommentCard from "./CommentCard.vue";
import NewCommentCard from "./NewCommentCard.vue";

export default defineComponent({
  name: "InteractiveCommentSection",
  components: {
    CommentCard,
    NewCommentCard,
  },
  // props: {},
  setup() {
    return {};
  },
});
</script>

<style></style>
