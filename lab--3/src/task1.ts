const array: Array<string> = ["one", "two", "three"];

export async function runSequent<T>(array: T[], callback:(item: T, index: number) => Promise<{ item: T; index: number }>)
    : Promise<Array<{ item: T, index: number }>> {
    const resArray: Array<{ item: T, index: number }> = []
    for (const item of array) {
        const index: number = array.indexOf(item);
        const callbackRes = await callback(item, index);
        resArray.push(callbackRes);
    }
    return resArray;
}