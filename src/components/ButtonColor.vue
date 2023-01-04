<template>
  <button :style="styleObject">
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";

import { colors } from "@/config";
export default defineComponent({
  name: "ButtonColor",
  props: {
    buttonColor: {
      type: String,
      default: colors.primary.moderateBlue,
    },
    buttonColorOnHover: {
      type: String,
      default: colors.primary.lightGrayishBlue,
    },
  },
  setup(props) {
    const styleObject = computed(() => {
      return {
        "--color": props.buttonColor,
        "--color-hover": props.buttonColorOnHover,
      };
    });
    return { styleObject };
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

  background-color: var(--color);
  color: var(--color-white);
}

button:hover {
  background-color: var(--color-hover);
}
</style>
