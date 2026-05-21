function flatArray(items) {
  let arr = [];

  for (let item in items) {
    if (Array.isArray(item)) {
      let newArr = flatArray(item);

      arr = [...arr, ...newArr];
    } else {
      arr.push(item);
    }
  }

  return arr;
}

function flatArrayReduce(items) {
  return items.reduce(
    (acu, item) =>
      acu.concat(Array.isArray(item) ? flatArrayAggregate(item) : item),
    []
  );
}

function flatObject(objParam, prefix = '') {
  let obj = {};

  for (let prop in objParam) {
    const value = objParam[prop];
    const newProp = prefix ? prefix + '.' + prop : prop;

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        const { ...arrObj } = value;

        let newObj = flatObject(arrObj, newProp);
        obj = { ...obj, ...newObj };
      } else {
        let newObj = flatObject(value, newProp);
        obj = { ...obj, ...newObj };
      }
    } else {
      obj[newProp] = value;
    }
  }

  return obj;
}
