// export {default} from "./form"
import form from "./form.vue";

export default {
  title: "form",
  component: form,
};

export const defaultView = () => ({
  components: {form},
  template: ` <form/>`,
});
