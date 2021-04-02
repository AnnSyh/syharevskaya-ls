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
              <app-button title="Отправить"/>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import appInput from  "../../components/input"
import appButton from  "../../components/button"
import {Validator, mixin as  ValidatorMixin} from 'simple-vue-validator';


export default {
  mixins:[ValidatorMixin],
  validators: {
    "user.name" : value => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password" : value => {
      return Validator.value(value).required("Введите имя пользователя");
    }
  },
  data:() => ({
    user: {
      password:"",
      name:""
      }
  }),
  components:{
    appInput,
    appButton,
    Validator
  },
  methods:{
    handleSubmit(){
      this.$validate().then((isValid)=> {
        if(isValid === false) return;

        //request
        console.log('request')
      })
    }
  }

}
</script>

<style lang="postcss" scoped src="./login.pcss"></style>
