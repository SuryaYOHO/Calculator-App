let expression = "";
const display = document.getElementById("display");

function press(val) {
  expression += val;
  display.value = expression;
}

function setOperator(op) {
  if (expression === "") return;

  const lastChar = expression.slice(-1);
  if ("+-*/".includes(lastChar)) {
    // replace double operator
    expression = expression.slice(0, -1);
  }

  expression += op;
  display.value = expression;
}


function clearAll() {
  expression = "";
  display.value = "";
}



function deleteOne() {
  expression = expression.slice(0, -1);
  display.value = expression;
}

function calculate() {
  if (!expression) return;

  let nums = [];
  let ops = [];
  let temp = "";

  // tokenize numbers & operators
  for (let ch of expression) {
    if ("+-*/".includes(ch)) {
      nums.push(Number(temp));
      ops.push(ch);
      temp = "";
    } else temp += ch;
  }
  nums.push(Number(temp));

  // first * / then + -
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "*" || ops[i] === "/") {
      let res = ops[i] === "*" ? nums[i]*nums[i+1] : nums[i]/nums[i+1];
      nums.splice(i,2,res);
      ops.splice(i,1);
      i--;
    }
  }

  let result = nums[0];
  for (let i=0;i<ops.length;i++){
    if(ops[i]==="+") result += nums[i+1];
    if(ops[i]==="-") result -= nums[i+1];
  }

  display.value = result;
  expression = result.toString();
}
