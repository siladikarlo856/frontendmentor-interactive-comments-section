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
    <div class="edit-comment-container">
      <div class="user-reply-container">
        <div class="user-container">
          <img :src="imageUrl" alt="" class="user-avatar" />
          <div class="username">amyrobson</div>
          <div v-if="ownedByCurrentUser" class="you-badge">you</div>
          <div class="created-at">1 month ago</div>
        </div>
        <div class="comment-buttons-container">
          <button class="btn-delete" v-if="ownedByCurrentUser">
            <img :src="deleteIconUrl" alt="Delete icon" class="delete-icon" />
            Delete
          </button>
          <button class="btn-edit" v-if="ownedByCurrentUser">
            <img :src="editIconUrl" alt="Edit icon" class="edit-icon" />
            Edit
          </button>
          <button class="btn-reply" v-if="!ownedByCurrentUser">
            <img :src="replyIconUrl" alt="Reply icon" class="reply-icon" />
            Reply
          </button>
        </div>
      </div>
      <div class="user-edit-container">
        <textarea
          id="edit-comment-content"
          name="edit-comment-content"
          placeholder="Add a comment..."
          >{{ commentContent }}</textarea
        >
      </div>
      <div class="update-button-container">
        <button class="update-button">Update</button>
      </div>
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
  name: "EditCommentCard",
  props: {
    ownedByCurrentUser: { type: Boolean },
  },
  setup() {
    const commentContent =
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and responsiveness at various breakpoints works really well.";
    return {
      imageUrl,
      deleteIconUrl,
      editIconUrl,
      minusIconUrl,
      plusIconUrl,
      replyIconUrl,
      commentContent,
    };
  },
});
</script>

<style>
.comment-card-container {
  width: 100%;
  border-radius: 10px;
  background-color: white;
  padding: 1.5rem;

  display: flex;
  flex-direction: row;
  margin-bottom: 1.5rem;
}

.user-reply-container {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
}

.reply-icon,
.edit-icon,
.delete-icon {
  height: 0.75rem;
  width: auto;
  margin: 0;
}

.btn-reply,
.btn-delete,
.btn-edit {
  font-weight: 600;
  font-size: 1rem;
  font-family: Rubik, sans-serif;
}

.btn-reply,
.btn-edit {
  color: var(--color-moderate-blue);
}
.btn-delete {
  color: var(--color-soft-red);
  margin-right: 1rem;
}

.btn-reply:hover,
.btn-edit:hover,
.btn-delete:hover {
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

.you-badge {
  margin-right: 1rem;
  background-color: var(--color-moderate-blue);
  border-radius: 2px;
  color: white;
  padding: 0.1rem 0.3rem;
  font-size: 0.8rem;
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

.user-edit-container textarea {
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
  min-height: 10ch;
  font-family: Rubik, sans-serif;
  font-size: var(--p-font-size);
  color: var(--color-dark-blue);

  cursor: pointer;

  margin-bottom: 1.5rem;
}

.user-edit-container textarea:hover {
  border-color: var(--color-moderate-blue);
}

.edit-comment-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.update-button-container {
  display: flex;
  justify-content: end;
}
.update-button {
  background-color: var(--color-moderate-blue);
  padding: 0.6em 1.2em;
  border-radius: 5px;
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1rem;
  font-family: Rubik, sans-serif;
}

.update-button:hover {
  opacity: 0.5;
}
</style>
