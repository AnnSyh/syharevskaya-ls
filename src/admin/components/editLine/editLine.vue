<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">


    <div class="layout-form">
      <div class="form-group" :class="{error: validation.hasError('email')}">
        <div class="label">* Email</div>
        <div class="content"><input type="text" class="form-control" v-model="email"/></div>
        <div class="message">{{ validation.firstError('email') }}</div>
      </div>
      <div class="form-group">
        <div class="actions">
          <button type="button" class="btn btn-primary" @click="submit">Submit</button>
        </div>
      </div>
    </div>



    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorText="errorText"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
          required
          type="text"
          maxlength="3"

        ></app-input>

<!--        <app-input v-if="1"-->
<!--            errorMessage="Произошла ошибка"-->
<!--        />-->
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;

Vue.use(SimpleVueValidation);


export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },
    editModeByDefault: Boolean,
    blocked: Boolean
  },
  data() {
    return {
      editmode: this.editModeByDefault,
      title: this.value,
      email: ''
    };
  },
  validators: {
    email: function (value) {
      return Validator.value(value).required().email();
    }
  },
  methods: {
    onApprove() {
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
