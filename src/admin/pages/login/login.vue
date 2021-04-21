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
      name: "annsyh030420218",
      password: "1111"
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
      // console.log('!!!submit', this.user.name, this.user.password)

      if ((await this.$validate()) === false) return;
      this.isSubmitDisabled = true;

       try {
         const response = await this.$axios.post("/login", this.user);
         // console.log('login1: response = ',response);

         const token = response.data.token;
         localStorage.setItem("token", token);//сохрнаили token в localStorage
         this.$axios.defaults.headers["Authorization"] = `Bearer ${token}`;
          await this.getUser();

          // const userResponse = await this.$axios.get("/user");
          // await this.login(userResponse.data.user);

         // console.log('login2: response = ',response);
         this.$router.replace('/');

       }  catch(error) {
          this.showTooltip({
            text: error.response.data.error,
            type: "error"
          })
         // console.log("response.data.error",error.response.data.error)
         // console.dir(error.response.data.error)
       } finally {
         this.isSubmitDisabled = false;
       }

    },
  }

}
</script>

<style lang="postcss" scoped src="./login.pcss"></style>
