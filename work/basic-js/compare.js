"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
  // /* method using JS libraries */
  // let ans = 0, a = word.toLowerCase(), b = guess.toLowerCase()
  // for(let s of a) {
  //   if(b.includes(s)) {
  //     b.replace(s, '')
  //     ans++
  //   }
  // }

  let ans = 0, s1 = word.toLowerCase(), s2 = guess.toLowerCase()
  const count = {}
  for(let s of s1) {
    if(count[s]) count[s]++
    else count[s] = 1
  }
  for(let s of s2) {
    if(count[s] > 0) {
      count[s]--
      ans++
    }
  }
  return ans
}
