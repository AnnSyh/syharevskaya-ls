<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">

    <div class="title" v-if="editmode === false">
      <div class="text">{{ value }}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div
          class="test-error"
          >
        <div style="display: flex">
          <div class="input">
            <app-input
                v-model="name"
                placeholder="Название новой группы"
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
              <icon symbol="tick"  @click="submit"></icon>
            </div>
            <div class="button-icon">
              <icon symbol="cross" @click="$emit('remove')"></icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    Validator
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: "fhghthtr fdherye"
    },
    editModeByDefault: Boolean,
    blocked: Boolean
  },
  data() {
    return {
      editmode: this.editModeByDefault,
      title: this.value,
      name: '',
    };
  },
  // validators: {
  //   name: function (value) {
  //     return Validator.value(value).required();
  //   }
  // },
  methods: {
    onApprove() {
      if (this.value.trim() === "") return false;
      if (this.title.trim() === this.value.trim()) {
        this.editmode = false;
      } else {
        this.$emit("approve", this.value);
      }
    },
    submit: function () {
      this.$validate()
          .then(function (success) {
            if (success) {
              alert('Validation succeeded!');
            }
          });
    }
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input")
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>
