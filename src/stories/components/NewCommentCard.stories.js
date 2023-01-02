import NewCommentCard from "@/components/NewCommentCard.vue";

export default {
  title: "InteractiveCommentSection/NewCommentCard",
  component: NewCommentCard,
};

const Template = (args) => ({
  components: { NewCommentCard },
  setup() {
    return { args };
  },
  /* html */
  template: `
    <NewCommentCard v-bind="args" />
  `,
});

export const Playground = Template.bind({});
Playground.args = {
  username: "maxblagun",
  mode: "new-comment",
};

export const _01_NewComment = Template.bind({});
_01_NewComment.args = {
  username: "maxblagun",
  mode: "new-comment",
};

export const _02_Reply = Template.bind({});
_02_Reply.args = {
  username: "maxblagun",
  mode: "reply",
};
