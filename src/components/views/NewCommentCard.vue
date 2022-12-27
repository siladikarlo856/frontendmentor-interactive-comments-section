<template>
  <div class="new-comment-card-container">
    <div class="user-avatar-container">
      <img :src="imageUrl" alt="" class="new-comment-user-avatar" />
    </div>
    <div class="user-input-container">
      <textarea
        id="new-comment-content"
        name="new-comment-content"
        placeholder="Add a comment..."
      />
    </div>
    <div class="send-button-container">
      <button class="send-button">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import imageUrl from "@/assets/images/avatars/image-juliusomo.png"; // => or relative path

export default defineComponent({
  name: "NewCommentCard",
  setup() {
    return { imageUrl };
  },
});
</script>

<style>
.new-comment-card-container {
  width: 50vw;
  border-radius: 10px;
  background-color: white;
  padding: 1.5rem;

  display: flex;
  flex-direction: row;
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
  border-radius: 5px;
  padding: 1em;

  width: 100%;
  height: 10ch;
  font-family: Rubik, sans-serif;
  font-size: var(--p-font-size);
  color: var(--color-dark-blue);
}

.send-button {
  background-color: var(--color-moderate-blue);
  padding: 0.6em 1.2em;
  border-radius: 5px;
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1rem;
  font-family: Rubik, sans-serif;
}

.send-button:hover {
  opacity: 0.5;
}
</style>
