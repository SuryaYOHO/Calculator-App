let currentValue = "";
let firstNumber = null;
let operator = "";

const display = document.getElementById("display");

/* number press */
function press(value) {
  if (value === "." && currentValue.includes(".")) return;

  currentValue += value;

  if (operator !== "") {
    display.value = firstNumber + operator + currentValue;
  } else {
    display.value = currentValue;
  }
}
/* operator press */
function setOperator(op) {
  if (currentValue === "") return;

  firstNumber = Number(currentValue);
  operator = op;
  currentValue = "";
  display.value = firstNumber + operator;
}

/* calculation */
function calculate() {
  if (firstNumber === null || currentValue === "") return;

  let secondNumber = Number(currentValue);
  let result;

  if (operator === "+") result = firstNumber + secondNumber;
  else if (operator === "-") result = firstNumber - secondNumber;
  else if (operator === "*") result = firstNumber * secondNumber;
  else if (operator === "/") result = secondNumber === 0 ? "Error" : firstNumber / secondNumber;

  display.value = result;
  currentValue = result.toString();
  firstNumber = null;
  operator = "";
}

/* clear all */
function clearAll() {
  currentValue = "";
  firstNumber = null;
  operator = "";
  display.value = "";
}

/* delete last digit */
function deleteOne() {
  currentValue = currentValue.slice(0, -1);
  display.value = currentValue;
}
