<template>
  <button :style="{ color: textColor }">
    <i>
      <slot name="icon"></slot>
    </i>
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonIconText",
  props: {
    textColor: { type: String },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped>
i {
  margin-right: 0.3rem;
  position: relative;
  top: 1px;
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
  text-transform: none;
  background-color: transparent;
  background-image: none;
  border: none;

  cursor: pointer;
  font-size: var(--p-font-size);
  font-weight: var(--font-weight-semibold);
}

button:hover {
  opacity: 0.5;
}
</style>
