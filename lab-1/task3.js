function copy(inpObject) {
    if (!inpObject) return inpObject;

    let resObject = Array.isArray(inpObject) ? [] : {};

    let value;
    for (const key in inpObject) {
        value = inpObject[key];
        resObject[key] = (typeof value === "object") ? copy(value) : value;
    }
    return resObject;
}


const obj = {
    name: 'Mark',
    age: 15,
    hobbies: ['studying', 'sports'],
    address: {
        street: '14 Avenue',
        city: 'New York',
        state: 'NY'
    }
};

console.log(clonedObj === obj); // false