import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL:"https://playground-firebase-914-default-rtdb.firebaseio.com/"
}

const app = initializeApp (appSettings)
const database = getDatabase (app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
//Connect html and javascript
const shoppingListEl = document.getElementById('shopping-list')

addButtonEl.addEventListener('click', function () {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()

    console.log('${inputValue} added to database')
})

onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    // For loop to iterate on itemsArray and console log each item

        console.log(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem) //display array items on screen
        }
    } else {
        shoppingListEl.innerHTML = "No items here...yet"
    }

})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}


function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl (item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}