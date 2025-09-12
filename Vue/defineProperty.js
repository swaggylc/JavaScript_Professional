const person = {
  name: "张三",
  age: 18,
};

defineProperty(person);

function showName() {
  console.log(person.name);
}
function showAge() {
  console.log(person.age);
}

function aotuRun(fn) {
  global.__runFunc = fn;
  fn();
  global.__runFunc = null;
}

aotuRun(showName);
aotuRun(showAge);

person.name = "李四";

function defineProperty(obj) {
  for (let key in obj) {
    let interValue = obj[key];
    let func = [];
    Object.defineProperty(obj, key, {
      get: function () {
        if (global.__runFunc && !func.includes(global.__runFunc))
          func.push(global.__runFunc);
        return interValue;
      },
      set: function (value) {
        // 修复bug：先更新值，再调用依赖函数
        interValue = value;
        for (let i = 0; i < func.length; i++) {
          func[i]();
        }
      },
    });
  }
}
