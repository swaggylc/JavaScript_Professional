import { effect, track } from "./effect.js";

function computedGetter(getterOrOptions) {
  let getter, setter;
  if (typeof getterOrOptions === "function") {
    getter = getterOrOptions;
    setter = () => {
      console.warn("computed属性不能被赋值");
    };
  } else if (typeof getterOrOptions === "object") {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return { getter, setter };
}

export function computed(getterOrOptions) {
  const { getter, setter } = computedGetter(getterOrOptions);
  let value;
  let dirty = true;

  const computedEffect = effect(getter, {
    lazy: true,
    scheduler: () => {
      dirty = true;
      trigger(_computedObj, TriggerOpTypes.SET, "value");
    },
  });
  const _computedObj = {
    get value() {
      track(_computedObj, TrackOpTypes.GET, "value");
      if (dirty) {
        value = computedEffect();
        dirty = false;
      }
      return value;
    },
    set value(newValue) {
      setter(newValue);
    },
  };
  return _computedObj;
}
