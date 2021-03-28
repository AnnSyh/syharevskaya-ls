// import skillAddLine from "./skillAddLine.vue";
import skillAddLine from "./skillAddLine";

export default {
  title: "skillAddLine",
  component: skillAddLine,
};

export const defaultView = () => ({
  components: {skillAddLine},
  template: `<skillAddLine/>`
});
