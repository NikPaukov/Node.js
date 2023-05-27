function isAnagram(string1, string2){
    string2 = string2.split("").reverse().join("");
    return string1===string2
}


console.log(isAnagram("hello", "olleh")); // true
console.log(isAnagram("hello", "olle")); // false
console.log(isAnagram("hello", "handle")); // false