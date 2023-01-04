<template>
  <div class="vote-counter-container">
    <button @click="onUpvoteClick" class="btn-vote-plus">
      <i> <PlusIcon /> </i>
    </button>
    <div class="vote-score">{{ modelValue }}</div>
    <button @click="onDownvoteClick" class="btn-vote-minus">
      <i> <MinusIcon /> </i>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PlusIcon from "./icons/IconPlus.vue";
import MinusIcon from "./icons/IconMinus.vue";

export default defineComponent({
  name: "VoteCounter",
  props: {
    modelValue: { type: Number, required: true },
  },
  components: {
    PlusIcon,
    MinusIcon,
  },
  setup(props, context) {
    function onUpvoteClick() {
      context.emit("update:modelValue", props.modelValue + 1);
    }

    function onDownvoteClick() {
      context.emit("update:modelValue", props.modelValue - 1);
    }
    return { onUpvoteClick, onDownvoteClick };
  },
});
</script>
<style scoped>
.vote-counter-container {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  justify-items: center;
  background-color: var(--color-very-light-gray);
  padding: 1rem;
  border-radius: 10px;
  height: 12ch;
}

.vote-score {
  color: var(--color-moderate-blue);
  font-weight: var(--font-weight-semibold);
  font-size: 1.3rem;
  margin: 1rem 0;
  flex-grow: 1;
}

button {
  /* tailwind button reset  */
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
  border: none;
  text-transform: none;
  background-color: transparent;
  background-image: none;

  cursor: pointer;
  font-size: var(--p-font-size);
  font-weight: var(--font-weight-semibold);
  fill: var(--color-light-grayish-blue);

  display: flex;
  flex-grow: 1;
  align-items: center;
}

button:hover {
  filter: brightness(0) saturate(100%) invert(29%) sepia(59%) saturate(1076%)
    hue-rotate(209deg) brightness(99%) contrast(87%);
}

button i {
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .vote-counter-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 12ch;
    height: 4rem;
  }

  .vote-score,
  button {
    flex-grow: 0;
  }
}
</style>
