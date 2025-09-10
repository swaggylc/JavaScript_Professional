function Parent() {
  this.name = "parent";
}
// 父类原型链上的方法
Parent.prototype.say = function () {
  console.log("hello world");
};
function Child() {
  this.age = "18";
}
// 更改子类的原型链指向父类的实例
Child.prototype = new Parent();

var child1 = new Child();
// 子类实例可以调用父类原型链上的方法
child1.say();
