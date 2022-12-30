import CommentCard from "@/components/CommentCard.vue";
import { ref } from "vue";

export default {
  title: "InteractiveCommentSection/CommentCard",
  component: CommentCard,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CommentCard },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const editorMode = ref("preview");
    const commentContent = ref(
      `Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and responsiveness at various breakpoints works really well.`
    );

    function openEditorInEditMode() {
      editorMode.value = "edit";
    }

    function onCommentUpdate() {
      editorMode.value = "preview";
    }

    function onValueChanged(newValue) {
      commentContent.value = newValue;
    }
    return {
      args,
      editorMode,
      openEditorInEditMode,
      onCommentUpdate,
      commentContent,
      onValueChanged,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  /* html */
  template: `<CommentCard 
      v-bind="args" 
      :editor-mode="editorMode" 
      :comment-content="commentContent"
      @openEditMode="openEditorInEditMode"
      @valueChanged="onValueChanged"
      @update="onCommentUpdate" />
      <div>{{ commentContent }}</div>
      `,
});
export const Playground = Template.bind({});
Playground.args = {
  username: "maxblagun",
  createdAt: "1 month ago",
};

export const Preview = () => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CommentCard },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const voteCount = ref(0);
    return { voteCount };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
      <CommentCard />
  `,
});
