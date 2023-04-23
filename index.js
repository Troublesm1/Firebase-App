const appSettings = {
    databaseURL:"https://playground-firebase-914-default-rtdb.firebaseio.com/"
}

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')

addButtonEl.addEventListener('click', function () {
    let inputValue = inputFieldEl.value
    console.log(inputValue)
})