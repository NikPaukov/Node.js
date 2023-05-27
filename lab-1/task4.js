const wrapper = (fn) => {
    const cache = {}
    return(...arguments)=>{
        const key = JSON.stringify(arguments)
        if (key in cache) {
            console.log("from cache")
            return cache[key]
        } else {

            console.log("calculated")
            const result = fn(...arguments)
            cache[key] = result

            return result
        }
    }
};

const calc = (a, b, c) => a+b+c;

const cachedCalc = wrapper(add);
cachedCalc(2,2,3); // 7 calculated
cachedCalc(5,8,1); // 14 calculated
cachedCalc(2,2,3); // 7 from cache