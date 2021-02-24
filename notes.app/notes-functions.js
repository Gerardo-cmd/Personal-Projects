'use strict'

// Read existing notes from local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    //This catch will handle the case where an invalid local storage value is presented...
    try{
        return notesJSON ? JSON.parse(notesJSON) : [] //If notesJSON is truthy then it will parse...
    }
    catch (e){
        return []
    }
    
}

// Save the notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex >= 0){
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteElement = document.createElement('a')
    const textElement = document.createElement('p')
    const statusElement = document.createElement('p')

    // Set up the remove node button
    if (note.title.length > 0){
        textElement.textContent = note.title
    }
    else {
        textElement.textContent = 'Unnamed note'
    }
    textElement.classList.add('list-item__title')
    noteElement.appendChild(textElement)

    // Set up the link
    noteElement.setAttribute('href', `/edit.html#${note.id}`)
    noteElement.classList.add('list-item')

    // Set up the status message
    statusElement.textContent = `Last edited on ${dayjs(note.updatedAt).format('MMMM D, YYYY H:m:s')}`
    statusElement.classList.add('list-item__subtitle')
    noteElement.appendChild(statusElement)
    return noteElement
}

//Sort the notes by one of three ways!
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited'){
        return notes.sort((a, b) => {
            if (a.updatedTimeStamp > b.updatedTimeStamp){
                return -1
            }
            else if (a.updatedTimeStamp < b.updatedTimeStamp){
                return 1
            }
            else {
                return 0
            }
        })

    }
    else if (sortBy === 'byCreated'){
        return notes.sort((a, b) => {
            if (a.createdTimeStamp > b.createdTimeStamp){
                return -1
            }
            else if (a.createdTimeStamp < b.createdTimeStamp){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else if (sortBy === 'alphabetical'){
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }
            else if (a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }
            else {
                return 0
            }
        })
    }
    else{
        return notes
    }
}

// Render Application notes
const renderNotes = (notes, filters) => {
    const notesElement = document.querySelector('div#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    notesElement.innerHTML = '<p></p>'

    if (filteredNotes.length > 0){
        filteredNotes.forEach((note) => {
            const noteElement = generateNoteDOM(note)
            document.querySelector('div#notes').appendChild(noteElement)
            notesElement.appendChild(noteElement)
        })
    }
    else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show. Try creating one!'
        emptyMessage.classList.add('empty-message')
        notesElement.appendChild(emptyMessage)
    }

    
}