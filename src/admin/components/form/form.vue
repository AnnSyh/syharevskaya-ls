<template>
  <div class="form-component">
<!--    form-component-->
    <form class="form" @submit.prevent="handleSubmit">
      <card>
        <h1 slot="title">Добавление работы</h1>
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label
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
            <div class="form-col">
              <div class="form-row">
                <app-input v-model="newWork.title" title="Название" />
              </div>
              <div class="form-row">
                <app-input v-model="newWork.link" title="Ссылка" />
              </div>
              <div class="form-row">
                <app-input v-model="newWork.description" field-type="textarea" title="Описание" />
              </div>
              <div class="form-row">
                <tags-adder v-model="newWork.techs" />
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
  </div>
</template>

<script>
import card from "../card";
import appButton from "../button";
import appInput from "../input";
import tagsAdder from "../tagsAdder";
import {mapActions, mapState} from "vuex";



export default {
  components: {
    card,
    appButton,
    appInput,
    tagsAdder
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
      // console.log('this.newWork = ',this.newWork);
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

