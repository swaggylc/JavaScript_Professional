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
      // console.log("nameAge 计算属性调用");
      return this.name + this.age;
    },
    // nameAge: {
    //   get() {
    //     console.log("nameAge 计算属性调用");
    //     return this.name + this.age;
    //   },
    // },
  },
  watch: {
    nameAge() {
      console.log("nameAge watch调用");
    },
    age(newVal, oldVal) {
      console.log("age 变化了", oldVal, "->", newVal);
    },
    name(newVal, oldVal) {
      console.log("name 变化了", oldVal, "->", newVal);
    },
  },
});

console.log("vue实例", vueInstance);
// 计算属性的回调应该只执行一次
// console.log("使用计算属性", vueInstance.nameAge);
// console.log("使用计算属性", vueInstance.nameAge);
// console.log("使用计算属性", vueInstance.nameAge);
// 重新赋值
vueInstance.name = "李四";
vueInstance.age = 22;

// 计算属性的回调应该只执行一次
// console.log("使用计算属性", vueInstance.nameAge);
// console.log("使用计算属性", vueInstance.nameAge);
// console.log("使用计算属性", vueInstance.nameAge);
