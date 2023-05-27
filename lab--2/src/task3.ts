export const copy = (inpObject: Record<string, any>)=> {
    if (!inpObject) return inpObject;

    let resObject: Record<string, any> = Array.isArray(inpObject) ? [] : {};

    let value :any;
    for (const key in inpObject) {
        value = inpObject[key];
        resObject[key] = (typeof value === "object") ? copy(value) : value;
    }
    return resObject;
}

