import Vue from "./observer/index.js";

const vueInstance = new Vue({
  data() {
    return {
      name: "张三",
      age: 18,
    };
  },
  computed: {
    nameAge() {
      console.log("nameAge 计算属性调用");
      return this.name + this.age;
    },
  },
  watch: {
    age(newVal, oldVal) {
      console.log("age 变化了", oldVal, "->", newVal);
    },
    name(newVal, oldVal) {
      console.log("name 变化了", oldVal, "->", newVal);
    },
  },
});

console.log("vue实例", vueInstance);
// 应该只打印一次
console.log("使用计算属性", vueInstance.nameAge);
console.log("使用计算属性", vueInstance.nameAge);
console.log("使用计算属性", vueInstance.nameAge);
// 重新赋值
vueInstance.name = "李四";
vueInstance.age = 20;
// 应该只打印一次
console.log("使用计算属性", vueInstance.nameAge);
console.log("使用计算属性", vueInstance.nameAge);
console.log("使用计算属性", vueInstance.nameAge);
