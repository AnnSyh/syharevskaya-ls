<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h1>Добавить отзыв</h1>
    <div class="form-container" slot="content">

      <div class="form-cols">
        <div class="form-col">
          <div class="label-block">
            <label
                :error-message="validation.firstError('newReview.preview')"
                :style="{backgroundImage: `url(${newReview.preview})`}"
                :class="[ 'uploader', {active: newReview.preview}, {
                            hovered: hovered
                          }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
            >
              <div class="uploader-title">Перетащите или загрузите картинку</div>
              <div class="uploader-btn">
                <app-button
                    typeAttr="file"
                    @change="handleChange"
                ></app-button>
              </div>
            </label>
        </div>
      </div>
        <div class="form-col">

            <div class="form-cols">
              <div class="form-col"> <app-input
                  v-model="newReview.name"
                  :error-message="validation.firstError('newReview.name')"
                  title="Имя автора"
              ></app-input></div>
              <div class="form-col"><app-input
                  v-model="newReview.titul"
                  :error-message="validation.firstError('newReview.titul')"
                  title="Титул автора"
              ></app-input></div>
            </div>
            <div class="form-row">
              <app-input
                  v-model="newReview.description"
                  :error-message="validation.firstError('newReview.description')"
                  field-type="textarea"
                  title="Отзыв"
              ></app-input>
            </div>


          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" plain></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить" :disabled="isSubmitDisabled"></app-button>
            </div>
          </div>
        </div>
    </div>
    </div>
  </form>
</template>

<script>

import Input from "../input/input";
import appButton from "../button/button";
import appInput from "../input/input";
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';
import {mapActions, mapState} from "vuex";

export default {
  components: {
    Input,
    appButton,
    appInput,
    Validator
  },
  mixins: [ValidatorMixin],
  validators: {
    "newReview.name": value => {
      return Validator.value(value).required("Введите имя");
    },
    "newReview.description": value => {
      return Validator.value(value).required("Введите описание");
    },
    "newReview.titul": value => {
      return Validator.value(value).required("Введите титул");
    } ,
    "newReview.preview": value => {
      return Validator.value(value).required("Загрузите картинку");
    }
  },
  data() {
    return {
      hovered: false,
      newReview: {
        name: "",
        titul: "",
        description: "",
        photo: {},
      },
      isSubmitDisabled: false,
    };
  },
  computed:{
    ...mapState('reviews',{
      works: state => state.data
    })
  },
  methods: {
    ...mapActions({
      addNewReview: "reviews/add",
    }),

    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      console.log('!!! submit form this.newReview = ',this.newReview);
      if ((await this.$validate()) === false) return;
      await this.addNewReview(this.newReview);
    },
    handleChange(event) {
      event.preventDefault();

      const file = event.dataTransfer
          ? event.dataTransfer.files[0]
          : event.target.files[0];

      this.newReview.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newReview.preview = reader.result;
      };
      reader.onerror = () => { //произошла ошибка
        // надо уведомить пользователя при помощи tooltip
      };
      reader.onabort = () => { //не успели дож-ся пока ф-л будет обработан и начали загружать нов ф-л
        // надо уведомить пользователя при помощи tooltip
      }
    },
  },
}

</script>


<style lang="postcss" src="./formReview.pcss" scoped>
</style>

