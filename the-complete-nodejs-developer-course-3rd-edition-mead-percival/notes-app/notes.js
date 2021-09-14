const fs = require('fs')
const chalk = require('chalk')
const log = console.log
const logSuccess = chalk.bgAnsi(102).blackBright
const logError = chalk.bgAnsi(41).whiteBright
const notesFile = ('notes.json')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => note.title === title)

  if( duplicateNotes.length == 0 ) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    log(logSuccess('Note added.'))
  } else {
    log(logError('Note already exist'))
  }
  
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title != title)
  if (notes.length > notesToKeep.length){
    log(logSuccess('Note removed.'))
    saveNotes(notesToKeep)
  } else {
    log(logError('No note found.'))
  }
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.filter((note) => note.title === title)
  
  if (note.length == 0){
    log(logError('No note found'))
  } else {
    log('Title: %s', note[0].title)
    log('Body: %s', note[0].body)
  }
}

const listNotes = () => {
  const notes = loadNotes()
  notes.forEach((note,i) => {
    log(logSuccess('Note number:',i+1))
    log('Title: %s', note.title)
    //log('Body: %s', note.body)
  });
  debugger
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(notesFile)
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)  
  } catch (e) {
    return []
  } 
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
  listNotes: listNotes
}