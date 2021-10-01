require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('614b0d363d71dbe760c84ac2').then((task) => {
//   console.log(task)
//   return Task.countDocuments({completed: false})
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e)
// })

const deleteTaskAndCount = async (id, age) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.count({ completed: false })
  return count
}

deleteTaskAndCount('614b2496f2d0f7e544b5a3e5').then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})