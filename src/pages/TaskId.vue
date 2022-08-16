<template>
  <TodoTitle
    :message="message"
  />
  <div class="row">
    <ul class="list-group col-3">
      <li 
          v-for="item in todoItems" :key="item.id"
          @click="$router.push({
            path: `/tasklist/${item.id}`, 
            query: { 
              title: item.title
            }
          })" 
          class="btn list-group-item"
          :class="{'bg-success': item.id === $route.params.id}"
        >
          Task: {{ item.title }}
        </li>
    </ul>
  </div>

  <my-button
    type="button"
    class="btn-success mt-4"
    @click="$router.push('/tasklist')"
  >
    Вернуться к списку задач
  </my-button>
</template>

<script>
  import TodoTitle from '@/components/TodoTitle';
  import axios from 'axios';

  export default {
    components: {
      TodoTitle,
    },
    data() {
      return {
        message: `Task: ${this.$route.query.title}`,
        todoItems: [],
      }
    },
    methods: {
      async getTasks() {
        try {
          const response = await axios.get('http://localhost:5000/tasks');
          this.todoItems = response.data;
        } catch (e) {
          console.log(e.message);
        }
      }
    },  
    mounted() {
      // по хорошему это берется из стора или нужно хранить данные в корневом компоненте и потом раскидывать, а так получается лишний запрос
      this.getTasks()
    },
    watch: {
      $route(toRoute, ftomRoute) {
        this.message = `Task: ${toRoute.query.title}`
      }
    }
  }
</script>

<style scoped>

</style>