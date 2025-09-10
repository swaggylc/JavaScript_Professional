function Parent(name) {
  console.log("Parent方法执行", this);
  this.name = name;
}

Parent.prototype.getName = function () {
  console.log(this.name);
};
function Child(age, name) {
  console.log("Child方法执行", this);
  // 调用父类的构造函数
  Parent.call(this, name);
  this.age = age;
}

let child = new Child(18, "张三");
// 无法调用父类原型链上的方法
// child.getName();

console.log(child);
