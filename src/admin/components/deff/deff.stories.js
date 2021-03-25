import deff from "./deff.vue";

export default {
  title: "deff",
  component: deff,
};

export const defaultView = () => ({
  components: {deff},
  template: ` <deff/>`,
});
