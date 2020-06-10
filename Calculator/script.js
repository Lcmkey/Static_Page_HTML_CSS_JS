const getEleById = (id) => {
  return document.querySelector(`#${id}`);
};

const getEleByClassName = (className) => {
  return document.querySelectorAll(`.${className}`);
};

const getHistory = () => {
  return getEleById("history-value").innerText;
};

const printHistory = (num) => {
  getEleById("history-value").innerText = num;
};

const getOutput = () => {
  return getEleById("output-value").innerText;
};

const printOutput = (num) => {
  if (!num) {
    getEleById("output-value").innerText = num;
  } else {
    getEleById("output-value").innerText = getFormattedNumber(num);
  }
};

const getFormattedNumber = (num) => {
  const value = Number(num).toLocaleString("en");

  return value;
};

const reverseNumberFormat = (num) => {
  return Number(num.replace(/,/g, ""));
};

// Math symbol Ebent "Click" Listener
const operator = getEleByClassName("operator");
[...operator].map((item) => {
  item.addEventListener("click", () => {
    if (item.id === "clear") {
      printHistory("");
      printOutput("");
    } else if (item.id === "backspace") {
      let output = reverseNumberFormat(getOutput()).toString();

      //if output has a value
      if (output) {
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      let output = getOutput();
      let history = getHistory();
      if (!output && history) {
        // const syc = ["+", "-", "*", "/"];
        // if (syc.includes(history[history.length - 1])) {
        //   history = history.substr(0, history.length - 1);
        // }
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }

      if (output || history) {
        output = !output ? "" : reverseNumberFormat(output);
        history = history + output;

        if (item.id === "=") {
          const result = eval(history);

          printOutput(result);
          printHistory("");
        } else {
          history = history + item.id;

          printHistory(history);
          printOutput("");
        }
      }
    }
  });
});

// Number 0 -9 Add Event "Click" Listener
const number = getEleByClassName("number");
[...number].map((item) => {
  item.addEventListener("click", () => {
    let output = reverseNumberFormat(getOutput());

    //if output is a number
    if (output != NaN) {
      output = output + item.id;
      printOutput(output);
    }
  });
});
