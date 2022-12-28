import VoteCounter from "../../components/VoteCounter.vue";
import { ref } from "vue";

export default {
  title: "InteractiveCommentSection/VoteCounter",
  component: VoteCounter,
};

export const FromZero = () => ({
  // Components used in your story `template` are defined in the `components` object
  components: { VoteCounter },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const voteCount = ref(0);
    return { voteCount };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="width: 280px; background-color: white; padding: 50px 100px">
      <VoteCounter v-model="voteCount" />
    </div>
  `,
});

export const FromFive = () => ({
  // Components used in your story `template` are defined in the `components` object
  components: { VoteCounter },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const voteCount = ref(5);
    return { voteCount };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="width: 280px; background-color: white; padding: 50px 100px">
      <VoteCounter v-model="voteCount" />
    </div>
  `,
});

export const FromMinuThree = () => ({
  // Components used in your story `template` are defined in the `components` object
  components: { VoteCounter },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const voteCount = ref(-3);
    return { voteCount };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="width: 280px; background-color: white; padding: 50px 100px">
      <VoteCounter v-model="voteCount" />
    </div>
  `,
});
