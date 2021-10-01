// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://root:OTk5Mzc2ZGFiYTc1OWViMjZlNmExZmJh@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{ useUnifiedTopology: true }, (error,client) => {
  if(error){
    return console.log('Unable to connect to db!')
  }
  const db = client.db(databaseName)

  // db.collection('tasks').findOne({ _id : new ObjectID("6149b7b4b4e1f5ee127672a3") },(error,result) => {
  //   if(error){
  //     return console.log('Unable to connect to db!')
  //   }
  //   console.log(result)
  // })

  // db.collection('tasks').find({ completed : false }).toArray((error, result) => {
  //   console.log(result)
  // })
  db.collection('tasks').deleteOne({
      description: 'Updated desc'
  }).then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
})