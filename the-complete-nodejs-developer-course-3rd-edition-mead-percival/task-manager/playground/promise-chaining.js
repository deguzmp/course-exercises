require('../src/db/mongoose')
const { update } = require('../src/models/user')
const User = require('../src/models/user')

// User.findOneAndUpdate('614b0584243caed6d2bd0bde',{ age: 1 }).then((user) => {
//   console.log(user)
//   return User.countDocuments({age: 1})
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e)
// })

const updateAgeAndCOunt = async (id, age) => {
  const user = await User.findByIdAndUpdate(id,{ age })
  const count = await User.count({ age })
  return count
}

updateAgeAndCOunt('614b01134211943a77c98036',3).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})