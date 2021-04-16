<template>

  <form class="form"
        @submit.prevent="handleSubmit"
  >
    <card>
      <h1 slot="title">Добавить отзыв</h1>
      <div class="form-container" slot="content">
        <div class="form-cols">
          <div class="w-30p">
            <div class="label-block">
              <app-input
                  :error-message="validation.firstError('newReview.preview')"
              ></app-input>
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
                <div class="uploader-link">

                  <app-button plain
                      typeAttr="file"
                      @change="handleChange"
                  ></app-button>
                </div>
              </label>
            </div>
          </div>
          <div class="w-70p">
            <div class="form-cols">
              <div class="form-col"> <app-input
                  v-model="newReview.author"
                  :error-message="validation.firstError('newReview.author')"
                  title="Имя автора"
              ></app-input></div>
              <div class="form-col"><app-input
                  v-model="newReview.occ"
                  :error-message="validation.firstError('newReview.occ')"
                  title="Титул автора"
              ></app-input></div>
            </div>
            <div class="form-row">
              <app-input
                  v-model="newReview.text"
                  :error-message="validation.firstError('newReview.text')"
                  field-type="textarea"
                  title="Отзыв"
              ></app-input>
            </div>

            <div class="form-btns">
              <div class="btn">
                <app-button plain
                    title="Отмена"
                    typeAttrs="button"
                    @click="$emit('close', $event)"
                  ></app-button>
              </div>
              <div class="btn">
                <app-button
                    title="Сохранить"
                    :disabled="isSubmitDisabled"
                ></app-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </card>
  </form>

</template>

<script>

import card from "../card";
import Input from "../input/input";
import appButton from "../button/button";
import appInput from "../input/input";
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';
import {mapActions, mapState} from "vuex";

export default {
  components: {
    card,
    Input,
    appButton,
    appInput,
    Validator
  },
  mixins: [ValidatorMixin],
  validators: {
    "newReview.author": value => {
      return Validator.value(value).required("Введите имя");
    },
    "newReview.text": value => {
      return Validator.value(value).required("Введите описание");
    },
    "newReview.occ": value => {
      return Validator.value(value).required("Введите титул");
    } ,
    "newReview.preview": value => {
      return Validator.value(value).required("Загрузите картинку");
    }
  },
  data() {
    return {
      hovered: false,
      newReview: {...this.currentReview },
      isSubmitDisabled: false,
    };
  },
  props:{
    currentReview:{
      type:Object,
      default:() => ({})
    },
  },
  computed:{
    ...mapState('reviews',{
      reviews: state => state.data
    }),
  },
  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      addNewReview: 'reviews/add',
      updateNewReview: 'reviews/update',
    }),

    setReview(){
      if (this.currentReview){
        this.newReview = {...this.currentReview}
        this.newReview.preview = 'https://webdev-api.loftschool.com/' + this.currentReview.photo
      } else {
        this.newReview = {
          id: null,
          author: "",
          occ: "",
          text: "",
          photo: {},
          preview: "",
        }
      }
    },

    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },

    async handleSubmit(value) {
      // console.log('! submit form handleSubmit');
      if ((await this.$validate()) === false) return;

      if(this.newReview.id){
        // console.log('this.newReview.id = ',this.newReview.id)
        await this.updateNewReview(this.newReview);

        let test = await this.updateNewReview(this.newReview);

        if(test == 1){  //закрыть окно при успешном редактировании
          this.showTooltip({
            text: 'Успешное редактирование отзыва',
            type: "success"
          });
          this.$emit('close');
        }
      } else {
        // console.log('!!! else this.newReview.id = ',this.newReview)
        await this.addNewReview(this.newReview);
        this.showTooltip({
          text: 'Успешное создание нового отзыва',
          type: "success"
        });
        this.$emit('close');
      }
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
  created() {
    this.setReview()
  },
  // beforeDestroy() {
  //   console.log('beforeDestroy');
  // },
  watch: {
    currentReview(){

      this.setReview()
    }
  }
}

</script>


<style lang="postcss" src="./formReview.pcss" scoped>
</style>

