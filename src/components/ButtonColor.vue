<template>
  <button>
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ButtonColor",
  setup() {
    return {};
  },
});
</script>
<style scoped>
button {
  /* tailwind button reset  */
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
  text-transform: none;
  background-color: transparent;
  background-image: none;
  border: none;

  cursor: pointer;
  font-size: var(--p-font-size);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;

  padding: 0.6em 1.2em;
  border-radius: var(--border-radius-small);

  background-color: var(--color-moderate-blue);
  color: var(--color-white);
}

button:hover {
  background-color: var(--color-light-grayish-blue);
}
</style>
