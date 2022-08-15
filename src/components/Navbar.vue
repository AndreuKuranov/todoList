<template>
  <!-- ----------------------------------------------- 1 вариант ----------------------------------------------- -->
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
    </div>
  </nav>
  <!-- ----------------------------------------------- 2 вариант ----------------------------------------------- -->
  <!-- <nav class="navbar navbar-dark bg-dark">
    <div class="container-xl justify-content-start gap-3">
      <router-link 
        tag="button"
        to="/"
        exact
        class="btn btn-light d-flex"
        active-class="bg__color"
      >
        <span class="material-symbols-outlined">Home</span>
      </router-link>
      <router-link 
        tag="button"
        to="/tasklist"
        class="btn btn-light"
        active-class="bg__color"
      >
        Tasklist
      </router-link>
      <router-link 
        tag="button"
        to="/about"
        class="btn btn-light"
        active-class="bg__color"
      >
        About
      </router-link>
    </div>
  </nav> -->
</template>

<script>
  export default {
    methods: {
      clessNavActive(cl) {
        return this.$route.path === cl ? 'btn-info' : 'btn-light'
      },
    },
  }
</script>

<style scoped>
/* .bg__color {
  background-color: #0dcaf0;
  border-color: #0dcaf0;
}
.bg__color:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.3);
} */
</style>