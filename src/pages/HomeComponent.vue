<template>
  <div>
    <TodoTitle
      :message="message"
    />

    <div v-if="!registration.registrationStatus" class="row justify-content-center mt-5 mx-2">
      <form @submit.prevent class="col-xl-6 col-lg-8 col-md-10 col-xs-12 border rounded py-4">

        <h3 class="text-center text-dark">Регистрация</h3>

        <div class="d-flex justify-content-center flex-column mt-4">
          <div class="form-floating mb-3">
            <my-input
              class="form-control" 
              id="login"
              v-focus
              placeholder="login"
              v-model="registration.login"
            />
            <label for="login">Логин</label>
          </div>
          <div class="input-group flex-nowrap mb-3">
            <div class="form-floating">
              <my-input
                class="form-control" 
                id="password" 
                :type="typeInputPass"
                placeholder="password"
                v-model="registration.password"
              />
              <label for="password">Пароль</label>
            </div>
            <my-button 
              type="button"
              class="btn-info d-flex align-items-center"
              @click="setVisibilityPassword"
            >
              <span class="material-symbols-outlined" v-if="visibilityPassword">visibility</span>
              <span class="material-symbols-outlined" v-else>visibility_off</span>
            </my-button>
          </div>

          <div class="d-flex justify-content-center mt-3">
            <my-button 
              type="button"
              :disabled="!valid()"
              :class="{ 'btn-success': valid(), 'btn-secondary': !valid() }"
              @click="toComeIn"
            >
              Войти
            </my-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import TodoTitle from '@/components/TodoTitle';

  export default {
    components: {
      TodoTitle,
    },
    data() {
      return {
        message: 'Добро пожаловать в приложение "Список задач"',
        registration: {
          login: '',
          password: '',
          registrationStatus: false
        },
        visibilityPassword: false,
        typeInputPass: 'password',
      }
    },
    methods: {
      validLogin() {
        return this.registration.login.length >= 5 
      },
      validPassword() {
        // (?=.*[0-9]) - строка содержит хотя бы одно число;
        // (?=.*[!@#$%^&*]) - строка содержит хотя бы один спецсимвол;
        // (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
        // (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
        // [0-9a-zA-Z!@#$%^&*]{6,} - строка состоит не менее, чем из 6 вышеупомянутых символов.

        const pas = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/;
        return pas.test(String(this.registration.password))
      },
      valid() {
        return this.validLogin() && this.validPassword()
      },
      toComeIn() {
        if (this.valid()) {
          this.registration.registrationStatus = true;

          const reg = JSON.stringify(this.registration);
          localStorage.setItem('registration', reg);

          this.$router.push('/tasklist');
        }
      },
      setVisibilityPassword() {
        this.visibilityPassword = !this.visibilityPassword;

        if(this.visibilityPassword) {
          this.typeInputPass = 'text'
        } else {
          this.typeInputPass = 'password'
        }
      },
    },
    mounted() {
      if (localStorage.getItem('registration')) {
        try {
          this.registration = JSON.parse(localStorage.getItem('registration'));
        } catch(e) {
          localStorage.removeItem('registration');
        }
      }
    },
  }
</script>

<style scoped>

</style>