<template>
  <div class="container">
    <section class="login">
      <div class="login-page-component">
        <div class="content">
          <form class="form" @submit.prevent="handleSubmit">
            <div class="form-title">Авторизация</div>
            <div class="row">
              <app-input
                  title="Логин"
                  v-model="user.name"
                  icon="user"
                  :error-message="validation.firstError('user.name')"
              />
            </div>
            <div class="row">
              <app-input
                  title="Пароль"
                  v-model="user.password"
                  icon="key"
                  type="password"
                  :error-message="validation.firstError('user.password')"
              />
            </div>
            <div class="btn">
              <app-button :disabled="isSubmitDisabled" title="Отправить"/>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import appInput from "../../components/input"
import appButton from "../../components/button"
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';
import { mapActions } from "vuex";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "user.name": value => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password": value => {
      return Validator.value(value).required("Введите имя пользователя");
    }
  },
  data: () => ({
    user: {
      name: "",
      password: ""
    },
    isSubmitDisabled: false
  }),
  components: {
    appInput,
    appButton,
    Validator
  },

  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      getUser: "user/login",
    }),
    async handleSubmit() {
      if ((await this.$validate()) === false) return;
      this.isSubmitDisabled = true;
      // console.log(this.user);

       try {
         const response = await this.$axios.post("/login", this.user);
         const token = response.data.token;

         localStorage.setItem("token", token);//сохрнаили token в localStorage
         this.$axios.defaults.headers["Authorization"] = `Bearer ${token}`;
         await this.getUser();
         this.$router.replace('/');

       }  catch(error) {
          this.showTooltip({
            text: error.response.data.error,
            type: "error"
          })
       } finally {
         this.isSubmitDisabled = false;
       }

    },
  }

}
</script>

<style lang="postcss" scoped src="./login.pcss"></style>
