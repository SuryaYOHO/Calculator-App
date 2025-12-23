    const display = document.getElementById("display");
    let expr = "";

    function press(value) {
      expr += value;
      display.value = expr;
    }
    function operator(op) {
      if (!expr) return;
      if ("+-*/".includes(expr.slice(-1))) return;
      expr += op;
      display.value = expr;
    }
    function clearAll() {
      expr = "";
      display.value = 0;
    }
    function backspace() {
      expr = expr.slice(0, -1);
      display.value = expr || 0;
    }
    function equal() {
      if (!expr) return;
      const tokens = tokenize(expr);
      const result = calculate(tokens);
      display.value = result;
      expr = result.toString();
    }
    function tokenize(str) {
      let tokens = [];
      let num = "";

      for (let ch of str) {
        if ("+-*/".includes(ch)) {
          tokens.push(num);
          tokens.push(ch);
          num = "";
        } else {
          num += ch;
        }
      }
      tokens.push(num);
      return tokens;
    }

    function calculate(tokens) {
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === "*" || tokens[i] === "/") {
          let a = Number(tokens[i - 1]);
          let b = Number(tokens[i + 1]);
          let res = tokens[i] === "*" ? a * b : a / b;
          tokens.splice(i - 1, 3, res.toString());
          i--;
        }
      }
      let result = Number(tokens[0]);
      for (let i = 1; i < tokens.length; i += 2) {
        let op = tokens[i];
        let num = Number(tokens[i + 1]);
        if (op === "+") result += num;
        else result -= num;
      }
      return result;
    }