'use strict'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const dateElement = document.querySelector('#last-edited')
const noteID = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteID)

//If note is undefined (falsy), then the ! will flip it to true...
if (!note){
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = `Last edited on ${dayjs(note.updatedAt).format('MMMM D, YYYY H:m:s')}`

//Set up event listener for the title...
titleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = dayjs()
    note.updatedTimeStamp = dayjs().valueOf()
    dateElement.textContent = `Last edited on ${dayjs(note.updatedAt).format('MMMM D, YYYY H:m:s')}`
    saveNotes(notes)
})

//Set up event listener for the body...
bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = dayjs()
    note.updatedTimeStamp = dayjs().valueOf()
    dateElement.textContent = `Last edited on ${dayjs(note.updatedAt).format('MMMM D, YYYY H:m:s')}`
    saveNotes(notes)
})

//Set up event listener for the remove button...
document.querySelector('#remove-note').addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

// Will listen in the window in other tabs and notice changes in the other tabs...
window.addEventListener('storage', (e) => {
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        let note = notes.find((note) => note.id === noteID)
        
        if (!note){
            location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = `Last edited on ${dayjs(note.updatedAt).format('MMMM D, YYYY H:m:s')}`
    }
})