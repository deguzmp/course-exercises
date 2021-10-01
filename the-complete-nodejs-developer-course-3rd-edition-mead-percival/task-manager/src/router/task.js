const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// Task
router.post('/tasks', auth, async (req,res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/tasks', auth, async (req,res) => {
  const match = {}
  if(req.query.completed){
    match.completed = req.query.completed === 'true'
  }
  const sort = {}
  if(req.query.sortBy){
    const parts = req.query.sortBy.split('%')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }
  console.log(sort)
  try {  
    let limit = parseInt(req.query.limit) || 0
    let skip = parseInt(req.query.skip) || 0
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit,
        skip,
        sort
      }
    })
    res.status(200).send(req.user.tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/tasks/:id', auth, async (req,res) => {
  try {
    const _id = req.params.id
    // const task = await Task.findById(_id)
    const task = await Task.findOne({ _id, owner: req.user._id })  
    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'description', 'completed' ]
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    if(!isValid){
      return res.status(404).send({ error: 'Invalid update'})
    }
    // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    // const task = await Task.findById(_id)
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
    if(!task){
      return res.status(404).send({ error: 'Task not found' })
    }
    updates.forEach((update) =>  task[update] = req.body[update]);
    await task.save()
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/tasks/:id', auth, async (req,res) => {
  try {
    const _id = req.params.id
    // const task = await Task.findByIdAndDelete(_id)  
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
    if(!task){
      return res.status(404).send({ error: 'Task not found' })
    }
    task.remove()
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router