import tagsAdder from "./tagsAdder";
import {action} from "@storybook/addon-actions";

const methods = {

}

export default {
  title: "tagsAdder",
  component: tagsAdder,
};

export const defaultView = () => ({
  components: {tagsAdder},
  data(){
    return {
      tags:"One, Two, Three, bjhbj"
    }
  },
  template: `
     <tagsAdder 
         v-model="tags" />
  `,
});

defaultView.story = {
  name:"Стандартный вид",
  parameters:{
    backgrounds:[
      {name:'grey', value: "#8395f7",default: true}
    ]
  }
}
