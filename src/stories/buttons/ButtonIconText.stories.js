import ButtonIconText from "../../components/ButtonIconText.vue";
import EditIcon from "../../components/icons/IconEdit.vue";
import ReplyIcon from "../../components/icons/IconReply.vue";
import DeleteIcon from "../../components/icons/IconDelete.vue";

import { colors } from "../../config";

export default {
  title: "InteractiveCommentSection/ButtonIconText",
  component: ButtonIconText,
  argTypes: {
    onClick: {},
  },
};

export const Reply = () => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ButtonIconText, ReplyIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const text = "Reply";

    function onClickHandler() {
      console.log("reply click");
    }
    return { text, colors, onClickHandler };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <ButtonIconText 
      :text-color="colors.primary.moderateBlue" 
      @click="onClickHandler"
      >
      <template #icon><ReplyIcon /></template>
        {{ text }}
      </ButtonIconText>
  `,
});

export const Edit = () => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ButtonIconText, EditIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const text = "Edit";

    function onClickHandler() {
      console.log("edit click");
    }
    return { text, colors, onClickHandler };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <ButtonIconText 
      :text-color="colors.primary.moderateBlue"
      @click="onClickHandler"
      >
      <template #icon><EditIcon /></template>
        {{ text }}
      </ButtonIconText>
  `,
});

export const Delete = () => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ButtonIconText, DeleteIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const text = "Delete";
    function onClickHandler() {
      console.log("delete click");
    }
    return { text, colors, onClickHandler };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <ButtonIconText 
      :text-color="colors.primary.softRed"
      @click="onClickHandler"
      >
      <template #icon><DeleteIcon /></template>
        {{ text }}
      </ButtonIconText>
  `,
});
