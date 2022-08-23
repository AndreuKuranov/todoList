<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-xl justify-content-start gap-3">
      <my-button 
        title="На главную"
        type="button"
        class="d-flex"
        :class="clessNavActive('/')"
        @click="$router.push('/')"
      >
        <span class="material-symbols-outlined">Home</span>
      </my-button>
      <my-button
        type="button"
        :class="clessNavActive('/tasklist')"
        @click="$router.push('/tasklist')"
      >
        Tasklist
      </my-button>
      <my-button 
        type="button"
        :class="clessNavActive('/about')"
        @click="$router.push('/about')"
      >
        About
      </my-button>
      <my-button 
        type="button"
        class="btn-light ms-auto"
        @click="login"
      >
        {{ loginCheck() ? 'Выйти' : 'Войти' }}
      </my-button>
    </div>
  </nav>
</template>

<script>
  export default {
    methods: {
      clessNavActive(cl) {
        return this.$route.path === cl ? 'btn-info' : 'btn-light'
      },
      isAuthorized() { 
        return JSON.parse(localStorage.getItem('registration'))
      },
      loginCheck() {
        return this.isAuthorized() ? this.isAuthorized().registrationStatus : false
      },
      login() {
        if (this.isAuthorized()) {
          localStorage.removeItem('registration');
        }

        this.$router.push('/');
      }
    },
  }
</script>

<style scoped>
</style>