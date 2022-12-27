<template>
  <div class="comment-card-container">
    <div class="score-container">
      <button class="btn-vote">
        <img :src="plusIconUrl" alt="Plus" class="btn-upvote-icon" />
      </button>
      <div class="score-value">0</div>
      <button class="btn-vote">
        <img :src="minusIconUrl" alt="Minus" class="btn-downvote-icon" />
      </button>
    </div>
    <div class="content-container">
      <div class="user-reply-container">
        <div class="user-container">
          <img :src="imageUrl" alt="" class="user-avatar" />
          <div class="username">amyrobson</div>
          <div class="created-at">1 month ago</div>
        </div>
        <div class="reply">
          <button class="btn-reply">
            <img :src="replyIconUrl" alt="Reply icon" class="reply-icon" />
            Reply
          </button>
        </div>
      </div>
      <p>
        Impressive! Though it seems the drag feature could be improved. But
        overall it looks incredible. You've nailed the design and responsiveness
        at various breakpoints works really well.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import imageUrl from "@/assets/images/avatars/image-amyrobson.png"; // => or relative path
import deleteIconUrl from "@/assets/images/icon-delete.svg";
import editIconUrl from "@/assets/images/icon-edit.svg";
import minusIconUrl from "@/assets/images/icon-minus.svg";
import plusIconUrl from "@/assets/images/icon-plus.svg";
import replyIconUrl from "@/assets/images/icon-reply.svg";

export default defineComponent({
  name: "InteractiveCommentSection",
  // props: {},
  setup() {
    return {
      imageUrl,
      deleteIconUrl,
      editIconUrl,
      minusIconUrl,
      plusIconUrl,
      replyIconUrl,
    };
  },
});
</script>

<style>
.comment-card-container {
  width: 50vw;
  border-radius: 10px;
  background-color: white;
  padding: 1.5rem;

  display: flex;
  flex-direction: row;
}

.user-reply-container {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
}

.reply-icon {
  height: 0.75rem;
  width: auto;
  margin: 0;
  color: var(--color-light-grayish-blue);
}

.btn-reply {
  font-weight: 600;
  font-size: 1rem;
  font-family: Rubik, sans-serif;
  color: var(--color-moderate-blue);
}

.btn-reply:hover {
  opacity: 0.5;
}

.score-container {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  justify-items: center;
  margin-right: 1.5rem;
  background-color: var(--color-very-light-gray);
  padding: 1rem;
  border-radius: 10px;
  height: 12ch;
}

.score-value {
  font-weight: 600;
  color: var(--color-moderate-blue);
  font-size: 1.3rem;
  margin: 1ch 0;
}

.user-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user-avatar {
  height: 2.5rem;
  margin-right: 1rem;
}

.username {
  color: var(--color-dark-blue);
  font-weight: 500;
  margin-right: 1rem;
}

button {
  display: inline-block;
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
}

.btn-vote {
  display: flex;
  flex-grow: 1;
  align-items: center;
}

.btn-vote:hover {
  filter: brightness(0) saturate(100%) invert(29%) sepia(59%) saturate(1076%)
    hue-rotate(209deg) brightness(99%) contrast(87%);
}

.upvote-icon {
  fill: black;
}
</style>
