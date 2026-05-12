/* global variables */
let currentDifficulty = "easy";
let currentMode = "timed(60s)";
let text;
let wpm; // (numOfChars / 5) * (60 / timeNeeded)
let accuracy; // (correctChars / totalChars)
/*------------------*/

/* getting data and displaying text based on difficulty */
async function getData(file) {
    const response = await fetch(file);

    let data = await response.json();
    let currentData = data[currentDifficulty];
    let randomText;

    return currentData[Math.floor(Math.random() * currentData.length)].text;
}

async function init() {
    try {
        text = await getData("data.json");

        let main = document.querySelector(".main .text");
        main.textContent = text;
    } catch(error) {
        console.error(error);
    }
}
init();
/*------------------*/

/* changing the difficulty/mode based on user choice */
function change(item) {
    let difficulty = item;
    let tagName = difficulty.tagName;
    let value;
    let parent;
    let idParent;
    if (tagName == "BUTTON") {
        value = difficulty.textContent.toLowerCase();
        parent = item.parentNode.parentNode;
        idParent = parent.id;
    } else if (tagName == "SELECT") {
        value = difficulty.value;
        parent = item.parentNode;
        idParent = parent.id;
    }

    let elements = document.getElementsByClassName(`${value}`);
    let prevActiveBtn = document.querySelectorAll(".active-btn");
        
    prevActiveBtn.forEach(e => {
        let eParentId = e.parentNode.parentNode.id;
        let eValue = e.textContent.toLowerCase();
        if (eValue != value && eParentId == idParent) {
            e.classList.remove('active-btn');
        }
    });
    elements[0].classList.add('active-btn');
    elements[1].parentNode.value = value;

    if (idParent == "mode") {
        currentMode = value;
    } else {
        currentDifficulty = value;
    }

    init();
}

let btns = document.querySelectorAll(".btn");
let select = document.querySelectorAll("select");

btns.forEach(btn => {
    btn.addEventListener("click", () => change(btn));
})
select.forEach(select => {
    select.addEventListener("change", () => change(select));
})
/*------------------*/

/* starting game procedure (click on the button/text)*/
/*------------------*/

/* ending game procedure (timer == 0:00, or text finished)*/
/*------------------*/