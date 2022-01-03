<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ message }}</h1>
    <span v-bind:title="message">Hover</span>
    <span v-if="seen">Seen</span>
    <h1 v-once>{{ message }}</h1>
    <span v-html="message"></span>
    <div :id="message + 'tt'">{{ testMessage }}</div>
    <span :href="message" @click="demo">测试链接</span>
    <a :[attr]="message" @click.prevent="demo">测试111</a>
    <ol>
      <!-- <li v-for="todo in todos" v-bind:key="todo">
        {{ todo.text }}
      </li> -->
      <todo v-for="item in todos" v-bind:todo="item" v-bind:key="item.text" />
    </ol>
    <input type="text" v-model="message" />
    <button v-on:click="test">Add</button>
  </div>
</template>

<script>
import todo from "./todo.vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    todo,
  },
  data: function () {
    return {
      message: "test",
      attr: "title",
      seen: true,
      todos: [
        { text: "学习Javascript" },
        { text: "学习Vue" },
        { text: "学习111" },
        { text: "学习222" },
      ],
    };
  },
  created: function () {
    console.log("Created Hook");
  },
  computed: {
    testMessage: function () {
      return this.message.split("").reverse().join(",");
    },
  },
  methods: {
    demo: function demo() {
      console.log("click");
      alert("test");
    },
    test: function () {
      this.todos.push({ text: this.message });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  list-style-type: disc;
  /* display: inline-block; */
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
