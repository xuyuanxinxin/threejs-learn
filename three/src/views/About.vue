<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" placeholder="input todo text" v-model="todoText" />
    <button @click="addTodo">add Todo</button>
    <ul>
      <li v-for="item of this.$store.state.todos" :key="item.id">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoText: "",
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    const answer = window.confirm("确认离开 ？");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  methods: {
    addTodo() {
      this.$store.commit("addTodo", {
        id: this.$store.state.todos.length,
        text: this.todoText,
      });
    },
  },
};
</script>
