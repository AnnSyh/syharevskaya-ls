import deff from "./siteHeader.vue";

export default {
  title: "deff",
  component: deff,
};

export const defaultView = () => ({
  components: {deff},
  template: ` <deff/>`,
});
