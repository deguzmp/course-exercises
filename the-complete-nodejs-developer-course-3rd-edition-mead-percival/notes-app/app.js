const yargs = require('yargs')
const notes = require('./notes')

// yargs version
yargs.command({
  command: 'add',
  describe: 'Add a new note.',
  builder:{
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note description',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    notes.addNote(argv.title, argv.body)
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove a note.',
  builder:{
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    notes.removeNote(argv.title)
  }
})

yargs.command({
  command: 'read',
  describe: 'Read a note.',
  builder:{
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    notes.readNote(argv.title)
  }
})

yargs.command({
  command: 'list',
  describe: 'List existing notes.',
  handler(){
    notes.listNotes()
  }
})

yargs.parse()