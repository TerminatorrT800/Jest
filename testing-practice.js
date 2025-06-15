function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
}

function reverse(str) {
  let reverseString = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reverseString += str.charAt(i);
  }
  return reverseString;
}

function calculator() {
  const add = (a, b) => {
    return a + b;
  };

  const subtrack = (a, b) => {
    return a - b;
  };

  const multiply = (a, b) => {
    return a * b;
  };

  const devide = (a, b) => {
    return a / b;
  };
  return { add, subtrack, multiply, devide };
}

function createMaps() {
  const upperCaseLetterMap = new Map();
  const lowerCaseLetterMap = new Map();

  for (let i = 0; i < 26; i++) {
    upperCaseLetterMap.set(i + 1, String.fromCharCode(65 + i));
    lowerCaseLetterMap.set(i + 1, String.fromCharCode(97 + i));
  }

  return { upperCaseLetterMap, lowerCaseLetterMap };
}

function ceaserCipher(str, offset) {
  let encryptedString = "";
  offset = offset % 26;

  const { lowerCaseLetterMap, upperCaseLetterMap } = createMaps();

  for (let i = 0; i < str.length; i++) {
    let found = false;

    for (const [key, value] of lowerCaseLetterMap) {
      if (value === str.charAt(i)) {
        if (key + offset > 26) {
          encryptedString += lowerCaseLetterMap.get(key + offset - 26);
        } else {
          encryptedString += lowerCaseLetterMap.get(key + offset);
        }
        found = true;
        break;
      }
    }
    if (found) continue;
    for (const [key, value] of upperCaseLetterMap) {
      if (value === str.charAt(i)) {
        if (key + offset > 26) {
          encryptedString += upperCaseLetterMap.get(key + offset - 26);
        } else {
          encryptedString += upperCaseLetterMap.get(key + offset);
        }
        found = true;
        break;
      }
    }
    if (found === false) {
      encryptedString += str.charAt(i);
    }
  }
  console.log(encryptedString);
  return encryptedString;
}

function avg(arr){
  let sum=0;
  arr.forEach(el=>{
    sum+=el;
  })

  return sum/arr.length
}


function arrayAnalyzer(arr){

  return {
    average: avg(arr),
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length
  }

}

module.exports = { capitalize, reverse, calculator, ceaserCipher, arrayAnalyzer };
