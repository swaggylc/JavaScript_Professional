const obj = {
  name: "张三",
  age: 18,
  borther: {
    name: "李四",
    age: 19,
  },
};

function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

function reactive(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  const _proxy = new Proxy(obj, {
    get(target, key) {
      console.log("读取", target, ".", key);
      if (isObject(target[key])) {
        return reactive(target[key]);
      }
      return target[key];
    },
    set(target, key, value) {
      console.log("设置", target, ".", key, " 为 ", value);
      target[key] = value;
    },
  });
  return _proxy;
}

const proxyObj = reactive(obj);
proxyObj.name;
proxyObj.age = 1;
proxyObj.borther.name;
proxyObj.borther.age = 2;
