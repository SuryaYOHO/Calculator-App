let expression = "";
let display = document.getElementById("display");


function getNumber(num) {
  expression += num;
  display.value = expression;
}

function getOperator(op) {
  if (expression === "") return; 
  expression += op;
  display.value = expression;
}

function clearDisplay() {
  expression = "";
  display.value = 0;
}

function deleteOne() {
  expression = expression.slice(0, -1);
  display.value = expression || 0;
}

function tokenizeExpression(expr) {
  const tokens = [];
  let number = "";

  for (let char of expr) {
    if ("+-*/".includes(char)) {
      if (number !== "") {
        tokens.push(number);
        number = "";
      }
      tokens.push(char);
    } else {
      number += char;
    }
  }

  if (number !== "") tokens.push(number);
  return tokens;
}

function calculateEqual() {
  if (expression === "") return;

  let tokens = tokenizeExpression(expression);

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      let a = parseFloat(tokens[i - 1]);
      let b = parseFloat(tokens[i + 1]);
      let result = tokens[i] === "*" ? a * b : a / b;
      tokens.splice(i - 1, 3, result.toString());
      i--; 
    }
  }

  let result = parseFloat(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    let op = tokens[i];
    let num = parseFloat(tokens[i + 1]);

    if (op === "+") result += num;
    else if (op === "-") result -= num;
  }

  display.value = result;
  expression = result.toString();
}
