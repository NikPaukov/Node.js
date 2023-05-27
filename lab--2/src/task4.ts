export const wrapper = (fn: Function) => {
    const cache: Record<string, any> = {}
    return function (...args: any[]) {
        const key = JSON.stringify(args)
        if (key in cache) {
            console.log("from cache")
            return cache[key]
        } else {
            console.log("calculated")
            const result = fn(...args)
            cache[key] = result

            return result
        }
    }
}

