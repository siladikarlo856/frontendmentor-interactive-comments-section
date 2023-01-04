import { ref, computed } from "vue";
import { defineStore } from "pinia";

import dataJson from "@/data/data.json";
import { UserModel } from "@/models/UserModel";
import { CommentModel } from "@/models/CommentModel";
import type { Comment } from "@/types/Comment";
import { ReplyModel } from "@/models/ReplyModel";
import type { Reply } from "@/types/Reply";

export const useCommentsStore = defineStore("comments", () => {
  const { currentUser: currentUserInitValue, comments: commentsInitValue } =
    dataJson;

  let currentMaxId = 4;

  const currentUser = ref(new UserModel(currentUserInitValue));

  const _comments = ref<CommentModel[]>(
    commentsInitValue.map((comment) => new CommentModel(comment))
  );

  const comments = computed(() => {
    return _comments.value;
    // return _comments.value.sort((a, b) => b.score - a.score);
  });

  const selectedId = ref(-1);

  function addNewComment(comment: Comment) {
    const newComment = new CommentModel(comment);
    newComment.id = ++currentMaxId;
    _comments.value.push(newComment);
  }

  function updateScoreById(id: number, score: number) {
    const index = _comments.value.findIndex((comment) => comment.id === id);
    console.log("updateScoreById", index, score);
    _comments.value[index].score = score;
    //sort
    _comments.value.sort((a, b) => b.score - a.score);
  }

  function updateReplyScoreById(
    commentId: number,
    replyId: number,
    newScore: number
  ) {
    const commentIndex = findIndexById(commentId);
    const replyIndex = findIndexById(replyId);

    _comments.value[commentIndex].replies[replyIndex].score = newScore;

    // sort replies by score
    sortByScore(_comments.value[commentIndex].replies);
  }

  function addReplyToCommentById(commentId: number, replyContent: string) {
    const commentIndex = _comments.value.findIndex(
      (comment) => comment.id === commentId
    );
    _comments.value[commentIndex].replies.push(
      new ReplyModel({
        id: ++currentMaxId,
        content: replyContent,
        user: currentUser.value,
        createdAt: "just now",
      } as Reply)
    );
  }

  function findIndexById(id: number): number {
    let index = -1;
    _comments.value.every((comment, commentIndex) => {
      if (comment.id === id) {
        index = commentIndex;
        return false; //break
      } else {
        comment.replies.every((reply, replyIndex) => {
          if (reply.id === id) {
            index = replyIndex;
            return false; //break
          }
          return true;
        });
      }
      if (index !== -1) {
        return false; // break
      }
      return true;
    });
    return index;
  }

  function sortByScore(array: Reply[]) {
    array.sort((a, b) => b.score - a.score);
  }

  function setSelectedId(id: number) {
    selectedId.value = id;
  }

  function resetSelectedId() {
    selectedId.value = -1;
  }

  function deleteSelected() {
    if (selectedId.value === -1) {
      return;
    }
    deleteById(selectedId.value);
  }

  function deleteById(id: number) {
    _comments.value = _comments.value.filter((comment) => {
      comment.replies = comment.replies.filter((reply) => {
        return reply.id !== id;
      });
      return comment.id !== id;
    });
  }

  return {
    currentUser,
    addNewComment,
    updateScoreById,
    updateReplyScoreById,
    _comments,
    addReplyToCommentById,
    selectedId,
    setSelectedId,
    resetSelectedId,
    deleteSelected,
  };
});
