<template>

    <form class="form" @submit.prevent="handleSubmit">
      <card>
        <h1 slot="title">Добавление работы</h1>
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <div class="label-block">
                <app-input
                    :error-message="validation.firstError('newWork.preview')"
                ></app-input>
                <label
                    :error-message="validation.firstError('newWork.preview')"
                    :style="{backgroundImage: `url(${newWork.preview})`}"
                    :class="[ 'uploader', {active: newWork.preview}, {
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
              <div class="form-row">
                <app-input
                    v-model="newWork.title"
                    title="Название"
                    :error-message="validation.firstError('newWork.title')"
                />
              </div>
              <div class="form-row">
                <app-input
                    v-model="newWork.link"
                    title="Ссылка"
                    :error-message="validation.firstError('newWork.link')"
                />
              </div>
              <div class="form-row">
                <app-input
                    v-model="newWork.description"
                    field-type="textarea"
                    title="Описание"
                    :error-message="validation.firstError('newWork.description')"
                />
              </div>
              <div class="form-row">
<!--                <p>newWork.techs = {{newWork.techs}}</p>-->
                <tags-adder
                    v-model="newWork.techs"
                    :error-message="validation.firstError('newWork.techs')"
                />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" plain></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить" :disabled="isSubmitDisabled"></app-button>
            </div>
<!--            <div class="btn">222-->
<!--              <app-button title="Сохранить" typeAttr="submit" disabled></app-button>-->
<!--            </div>-->
          </div>
        </div>
      </card>
    </form>

</template>

<script>
import card from "../card";
import appButton from "../button";
import appInput from "../input";
import tagsAdder from "../tagsAdder";
import {mapActions, mapState} from "vuex";
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';
import Input from "../input/input";


export default {
  components: {
    Input,
    card,
    appButton,
    appInput,
    tagsAdder,
    Validator
  },
  mixins: [ValidatorMixin],
  validators: {
    "newWork.title": value => {
      return Validator.value(value).required("Введите название");
    },
    "newWork.link": value => {
      return Validator.value(value)
          .url("Введите корректный url")
          .required("Введите ссылку");
    },
    "newWork.description": value => {
      return Validator.value(value).required("Введите описание");
    },
    "newWork.techs": value => {
      return Validator.value(value).required("Введите tag");
    } ,
    "newWork.preview": value => {
      return Validator.value(value).required("Загрузите картинку");
    }
  },
  data() {
    return {
      hovered: false,
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
      },
      isSubmitDisabled: false,
    };
  },
  computed:{
    ...mapState('works',{
      works: state => state.data
    })
  },
  methods: {
    ...mapActions({
      addNewWork: "works/add",
    }),

    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      console.log('!!! submit form this.newWork = ',this.newWork);
      if ((await this.$validate()) === false) return;
      await this.addNewWork(this.newWork);
    },
    handleChange(event) {
      event.preventDefault();

      const file = event.dataTransfer
          ? event.dataTransfer.files[0]
          : event.target.files[0];

      this.newWork.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.newWork.preview = reader.result;
      };
        reader.onerror = () => { //произошла ошибка
          // надо уведомить пользователя при помощи tooltip
        };
        reader.onabort = () => { //не успели дож-ся пока ф-л будет обработан и начали загружать нов ф-л
          // надо уведомить пользователя при помощи tooltip
        }
    },
  },
};
</script>
<style lang="postcss" src="./form.pcss" scoped>
</style>

