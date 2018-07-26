
var uppercaseObjectFieldsNames = (object) => {
    const newObject = {};

    Object.entries(object)
        .forEach(([key, value]) => newObject[key] = value);

    console.log(newObject);
    return newObject;
}

export default uppercaseObjectFieldsNames;
