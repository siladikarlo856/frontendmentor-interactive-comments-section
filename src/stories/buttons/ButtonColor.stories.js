import ButtonColor from "../../components/ButtonColor.vue";

export default {
  title: "InteractiveCommentSection/ColorButtons",
  component: ButtonColor,
  argTypes: {
    onClick: {},
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ButtonColor },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<ButtonColor v-bind="args">{{ args.text }}</ButtonColor>',
});

export const Send = Template.bind({});
Send.args = {
  text: "Send",
};

export const Update = Template.bind({});
Update.args = {
  text: "Update",
};

export const Reply = Template.bind({});
Reply.args = {
  text: "Reply",
};
