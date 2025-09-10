function Parent(name) {
  this.name = name;
}
Parent.prototype.say = function () {
  console.log("hello world");
};
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

let child = new Child("张三", 18);
child.say();
console.log(child);
