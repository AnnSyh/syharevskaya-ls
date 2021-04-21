<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">

    <div class="title" v-if="editmode === false">
      <div class="text">{{ value }}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale
              @click="editmode = true"
        ></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="test-error">
        <div style="display: flex">
          <div class="input">
            <app-input
                placeholder="Название новой группы"
                v-model="name"
                :value="value"
                :error-message="validation.firstError('name')"
                @input="$emit('input', $event)"
                @keydown.native.enter="onApprove"
                autofocus="autofocus"
                no-side-paddings="no-side-paddings"
            ></app-input>
          </div>
          <div class="buttons">
            <div class="button-icon">
              <icon symbol="tick"  @click="onApprove"></icon>
            </div>
            <div class="button-icon">
              <icon symbol="cross"
                    @click="$emit('remove',$event)"
              ></icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon from "../../components/icon/icon";
import appInput from "../input/input";
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';


export default {
  mixins: [ValidatorMixin],
  validators: {
    "name": value => {
      return Validator.value(value).required("Введите наз новой группы");
    }
  },
  components: {
    appInput,
    Validator,
    icon,
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: "errorText"
    },
    editModeByDefault: Boolean,
    blocked: Boolean
  },
  data() {
    return {
      editmode: this.editModeByDefault,
      name: this.value,
    };
  },
  methods: {
    onApprove() {
      if (this.name.trim() === "") {  //валидация  если поле пустое
        // console.log("Пустое поле ")
        return this.$validate() === false;
      }
      this.editmode = false;
        this.$emit("approve", this.name.trim());
    },
  },
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>
