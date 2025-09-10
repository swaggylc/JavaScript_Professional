const parent = {
  name: "parent",
  age: 18,
  say() {
    console.log("hello world");
  },
};
const child = Object.create(parent);
child.age = 20;
console.log(child.name, child.age);
child.say();
