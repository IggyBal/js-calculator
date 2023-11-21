const screenDiv = document.querySelector(".screen");
const numButtons = document.querySelectorAll(".numpad > .button");
const oprButtons = document.querySelectorAll(".oprpad > .button");
const clearButton = document.querySelector("#clear");

let initClick = true;
let [operand1, operand2] = [null, null];

numButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (initClick) {
            screenDiv.innerHTML = button.dataset.number;        
            initClick = false;
        } else {
            screenDiv.innerHTML += button.dataset.number;
        } 

    });    
});

let oprLoad = null;

oprButtons.forEach(button => {
    button.addEventListener("click", () => {
        console.log("oprLoad", oprLoad);
        console.log("operator", button.dataset.operator);

        if (oprLoad) {
            operand2 = screenDiv.innerHTML;
            if (button.dataset.operator != "=") { 
               operand1 = eval(operand1 + oprLoad + operand2); 
            }
            screenDiv.innerHTML = operand1;
            oprLoad = button.dataset.operator;
            initClick = true;
        }

        operand1 = screenDiv.innerHTML;
        oprLoad = button.dataset.operator;
        initClick = true;

    });
});

clearButton.addEventListener("click", () => {
    screenDiv.innerHTML = "CLEAR";
    const intervalClear = setInterval(() => {
        screenDiv.innerHTML = "0";
        clearInterval(intervalClear);
    }, 1000);
    oprLoad = null;
    operand1 = null;
    operand2 = null;
    initClick = true;
});