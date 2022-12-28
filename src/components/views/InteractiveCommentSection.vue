<template>
  <div class="container">
    <CommentCard :ownedByCurrentUser="false" />
    <NewCommentCard buttonText="Reply" />
    <CommentCard :ownedByCurrentUser="true" />
    <ReplySection />
    <NewCommentCard buttonText="Send" />
    <div class="button-color-container">
      <ButtonIconText :text-color="colors.primary.moderateBlue"
        ><template #icon><ReplyIcon /></template>Reply</ButtonIconText
      >
    </div>

    <div class="button-color-container">
      <ButtonIconText :text-color="colors.primary.moderateBlue"
        ><template #icon><EditIcon /></template>Edit</ButtonIconText
      >
    </div>

    <div class="button-color-container">
      <ButtonIconText :text-color="colors.primary.softRed"
        ><template #icon><DeleteIcon /></template>Delete</ButtonIconText
      >
    </div>

    <div class="button-color-container">
      <ButtonColor>Test</ButtonColor>
    </div>
    <div
      class="button-color-container"
      style="background-color: white; padding: 1rem"
    >
      <VoteCounter />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommentCard from "./CommentCard.vue";
import NewCommentCard from "./NewCommentCard.vue";
import ReplySection from "./ReplySection.vue";
import ReplyIcon from "@/components/icons/IconReply.vue";
import EditIcon from "@/components/icons/IconEdit.vue";
import DeleteIcon from "@/components/icons/IconDelete.vue";
import ButtonIconText from "@/components/ButtonIconText.vue";
import ButtonColor from "@/components/ButtonColor.vue";
import { colors } from "@/config";
import VoteCounter from "@/components/VoteCounter.vue";

export default defineComponent({
  name: "InteractiveCommentSection",
  components: {
    CommentCard,
    NewCommentCard,
    ReplySection,
    ButtonIconText,
    ReplyIcon,
    EditIcon,
    DeleteIcon,
    ButtonColor,
    VoteCounter,
  },
  // props: {},
  setup() {
    return { colors };
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
}

.button-color-container {
  width: 200px;
  margin-inline: auto;
  display: flex;
  justify-content: center;
  margin: 1rem auto;
}
</style>
