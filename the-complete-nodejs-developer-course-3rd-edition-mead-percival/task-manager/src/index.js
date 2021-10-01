const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
const auth = require('./middleware/auth')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

const multer = require('multer')
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(doc|docx)$/)){
      cb(new Error('Upload a doc or docx'))
    }
    cb(undefined, true)
    // cb(new Error('Upload error'))
    // cb(undefined, false)
  }
})
app.post('/upload', upload.single('upload'), (req,res) => {
  res.send({ status: 'success'})
},(error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

// Maintenance mode
// app.use((req, res, next) => {
//   res.status(503).send('Maintenance Mode')
// })

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up at port ',port)
})



