const copy = object => {
    let result = {};
    if (object instanceof Array) {
        result = object.map(arr => [...arr]);
    } else if (object instanceof Object) {
        result = JSON.parse(JSON.stringify(object));
    }

    return result;
};

export default copy;