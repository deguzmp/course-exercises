// const log = console.log

// setTimeout(() => log('Two seconds'),2000)

// const names = ['me','you','i']
// const shortNames = names.filter((name) => name.length <= 2)

// const geocode = (address, callback) => {
//   setTimeout(() => {
//     const data ={
//       lat: 0,
//       long: 0
//     }
//     callback(data)
//   })
// }

// const data = geocode('Philadepia',(data) => log(data))

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (x,y,the_callback) => {
  const the_sum = x + y
  setTimeout(() => {
    the_callback(the_sum)
  }, 2000)
}

add(1, 4, (sum) => {
  console.log(sum) // Should print: 5
})
