let firstNumber = "";
let secondNumber = "";
let operator = "";
let display = document.getElementById("display");


function pressNumber(num) {
    if (operator === "") {      
        firstNumber += num;
    } else {
        secondNumber += num;
    }
    updateDisplay();
}

function pressOperator(op) {
    if (firstNumber === "") return; 
    if (operator !== "") return;    
    operator = op;
    updateDisplay();
}

function calculate() {
    if (firstNumber === "" || secondNumber === "" || operator === "") return;

    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(secondNumber);
    let result = 0;

    if (operator === "+") result = num1 + num2;
    else if (operator === "-") result = num1 - num2;
    else if (operator === "*") result = num1 * num2;
    else if (operator === "/") result = num1 / num2;

    display.value = result;
    firstNumber = result.toString();
    secondNumber = "";
    operator = "";
}

function clearDisplay() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    display.value = "0";
}

function backspace() {
    if (operator === "") {
        firstNumber = firstNumber.slice(0, -1);
    } else if (secondNumber === "") {
        operator = ""; 
    } else {
        secondNumber = secondNumber.slice(0, -1);
    }
    updateDisplay();
}

function updateDisplay() {
    display.value = firstNumber + (operator ? " " + operator + " " : "") + secondNumber;
}
