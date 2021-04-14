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
              <app-button
                  title="Отмена"
                  typeAttrs="button"
                  @click="$emit('close', $event)" plain>
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
      // newReview: {
      //   author: "",
      //   occ: "",
      //   text: "",
      //   photo: {},
      // },
      isSubmitDisabled: false,
    };
  },
  props:{
    currentReview:{
      type:Object,
      default:() => ({})
    }
  },
  computed:{
    ...mapState('reviews',{
      reviews: state => state.data
    })
  },
  methods: {
    ...mapActions({
      addNewReview: 'reviews/add',
      // addNewReview: 'works/add',
      // updateNewReview: 'rev/update',
    }),

    setReview(){
      if (this.currentReview){
        this.newReview = {...this.currentReview}
        this.newReview.photo = 'https://webdev-api.loftschool.com/' + this.currentReview.photo
      } else {
        this.newReview = {
          id: null,
          author: "",
          occ: "",
          text: "",
          photo: "",
          // preview: "", //???
          // newReview: {
          //   author: "",
          //   occ: "",
          //   text: "",
          //   photo: {},
          // },
        }
      }
    },

    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },

    async handleSubmit(value) {
      console.log('value = ',value);
      console.log('! submit form this.newReview = ',this.newReview);
      if ((await this.$validate()) === false) return;

      await this.addNewReview(this.newReview);
      console.log('after')

      // if(this.newReview.id){
      //   console.log('this.newReview.id = ',this.newReview.id)
      //   await this.updateNewReview(this.newReview);
      // } else {
      //   console.log('else this.newReview.id = ',this.newReview.id)
      //   await this.addNewReview(this.newReview);
      // }
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

