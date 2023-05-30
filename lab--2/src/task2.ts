export const isAnagram=(string1: string, string2: string): boolean =>{
    string1 = string1.toLowerCase();
    string2 = string2.toLowerCase();
    string2 = string2.split("").reverse().join("");
    return string1 === string2
}
