const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// User
router.post('/users', async (req,res) => {
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
} catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/login',async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/logout', auth, async (req,res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send({ status: 'success'})
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post('/users/logoutAll', auth, async (req,res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send({ status: 'success'})
  } catch (e) {
    res.status(500).send(e)
  }
})

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      cb(new Error('Image type must be jpg, jpeg or png'))
    }
    cb(undefined, true)
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send({ status: 'success'})
},(error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.get('/users/me', auth, async (req,res) => {
  // try {
  //   const users = await User.find({})
  //   res.send(users)
  // } catch (e) {
  //   res.status(500).send(e)
  // }
  res.send(req.user)
})

router.get('/users/:id',async (req,res) => {
  try {
    const _id = req.params.id
    const user = await User.findById(_id)
    if(!user){
      return res.status(404).send({ error: 'User not found' })
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user || !user.avatar){
      throw new Error()
    }
    res.set('Content-Type','image/png')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = [ 'name', 'age', 'password', 'email'  ]
  const isValid = updates.every((update) => allowedUpdates.includes(update))
  if(!isValid){
    return res.status(404).send('Invalid update')
  }
  try {
    
    const user = req.user
    updates.forEach((update) => user[update] = req.body[update] )
    await user.save()
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/users/me', auth, async (req,res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/users/me/avatar', auth, async (req,res) => {
  try {
    req.user.avatar = undefined
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router