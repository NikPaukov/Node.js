export function arrayChangeDelete<T>(array: T[], validator: (item: T) => boolean): T[] {
    const deletedElements: T[] = [];
    array.forEach((el: T, ind: number) => {
        if (validator(el)) {
            array.splice(ind, 1);
            deletedElements.push(el)
        }
    });
    return deletedElements;
}