import user from "./user.vue";
import { text, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "user",
  components: { user },
  decorators: [withKnobs]
};

export const defaultView = () => ({
  components: { user },
  props: {
    size: {
      default: text("size", "3.1")
    }
  },
  template: `
    <user :size="size" src="https://picsum.photos/300/300" />
  `,
});

defaultView.story = {
  name: "Стандартный вид"
}
