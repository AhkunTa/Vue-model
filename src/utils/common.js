function deepClone(obj) {
  let object;

  if (typeof obj == "object") {
    if (Array.isArray(obj)) {
      object = [];
      for (let i in obj) {
        object.push(deepClone(obj[i]));
      }
    } else if (obj.constructor == Object) {
      object = {};
      for (let i in obj) {
        object[i] = deepClone(obj[i]);
      }
    } else {
      object = obj;
    }
  } else {
    object = obj;
  }

  return object;
}
export { deepClone };
