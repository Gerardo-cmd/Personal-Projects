'usw strict'

let notes = getSavedNotes()
//DOM - Document Object Model

//Query and remove
//const p = document.querySelector('p')
//p.remove()

//Query all and remove
/*const ps = document.querySelectorAll('p')

ps.forEach(function (p){
    p.textContent = '******'
    // console.log(p.textContent)
    // p.remove()
})

// Add a new element
const newParagraph = document.createElement('p')
newParagraph.textContent = 'This is a new element from JavaScript'
document.querySelector('body').appendChild(newParagraph)*/

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    const newID = uuidv4();
    let now = dayjs()
    let nowTimeStamp = dayjs().valueOf()
    notes.push({
        id: newID,
        title: '',
        body: '',
        createdTimeStamp: nowTimeStamp,
        createdAt: now,
        updatedAt: dayjs(),
        updatedTimeStamp: dayjs().valueOf()
    })
    saveNotes(notes)
    location.assign(`/edit.html#${newID}`)
})


document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    saveNotes(notes)
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

/*let now = dayjs()
now = now.month(7).date(30).year(2000)
console.log(now.format('MMM D, YYYY'))

const nowTimestamp = now.valueOf()
console.log(dayjs(nowTimestamp).toString())*/




//--Single--
//p
//#replace
//.item

//--Multiple--
//p#order
//button.inventory
//h1#title.application
//h1.application#title