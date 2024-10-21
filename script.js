//create initial functions
let add = (x, y) => x + y;
let subtract = (x, y) => x - y;
let multiply = (x, y) => x * y;
let divide = (x, y) => x / y;

let firstNumber = "";
let operator = "";
let secondNumber = "";
let result = "";
let operationStarted = false;
let operatorSelected = false;

let operate = function (operator, x, y) {
  switch (operator) {
    case "+":
      return add(x, y);

    case "-":
      return subtract(x, y);

    case "*":
      return multiply(x, y);

    case "/":
      return divide(x, y);

    default:
      return "ERROR";
  }
};

let firstDisplayNumber = document.querySelector(".firstNumber");
let secondDisplayNumber = document.querySelector(".secondNumber");
let resultDisplayNumber = document.querySelector(".result");
let inputButton = document.querySelectorAll(".input");
let decimalButton = document.querySelector(".decimal");
let clearButton = document.querySelector(".clear");
let allClearButton = document.querySelector(".allClear");
let equalsButton = document.querySelector(".equals");

function toggleDecimal(number) {
  number.includes(".")
    ? (decimalButton.disabled = true)
    : (decimalButton.disabled = false);
}

let limitInputLength = function(input) {
  let strInput = input.toString();
  
  if (strInput.length > 7) {
    inputButton.forEach((btn) => {
      btn.classList.contains("number") ? btn.disabled = true : btn.disabled = false;
    }) 
  } else {
    inputButton.forEach((btn) => {
      btn.disabled = false;
    })
  }
}

let limitResultLength = function(number) {
  let strNumber = number.toString();

  if (strNumber.length > 9) {
    return parseFloat(number).toExponential(4);
  } else {
    return parseFloat(number);
  }
}


inputButton.forEach((input) => {
  input.addEventListener("click", (event) => {
    //take input value
    const inputText = event.target.textContent;

    //generate first number
    if (input.classList.contains("number") && !operatorSelected) {
      firstNumber = !firstNumber ? inputText : firstNumber + inputText;
      firstDisplayNumber.textContent = firstNumber;
      toggleDecimal(firstNumber);
      limitInputLength(firstNumber);
      operationStarted = true;

      //select operator
    } else if (input.classList.contains("operator") && operationStarted) {
      if (!secondNumber) {
        operator = inputText;
        secondDisplayNumber.textContent = operator + " ";
        operatorSelected = true;

        inputButton.forEach((btn) => {
          btn.disabled = false;
        })
      }

      //generate second number
    } else if (input.classList.contains("number") && operatorSelected) {
      secondNumber = !secondNumber ? inputText : secondNumber + inputText;
      secondDisplayNumber.textContent = operator + " " + secondNumber;
      toggleDecimal(secondNumber);
      limitInputLength(secondNumber);
      operationStarted = true;
    }
  });
});

//calculate result
equalsButton.addEventListener("click", () => {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  //check for invalid input
  if (isNaN(secondNumber)) {
    secondDisplayNumber.textContent = operator + " ERROR";
    return;
  }
  //calculate result
  result = operate(operator, firstNumber, secondNumber);
  result = limitResultLength(result);
  console.log(result);
  
  //check for valid result
  if (isNaN(result) || result === Infinity) {
    secondDisplayNumber.textContent = operator + " ERROR";
    secondNumber = "";
    return;
  }
  //set up for subsequent calculations
  firstNumber = result;
  secondNumber = "";
  operator = "";
  operatorSelected = false;
  //update display
  firstDisplayNumber.textContent = result;
  secondDisplayNumber.textContent = "";
});

//clear current input
clear = function () {
  if (operatorSelected) {
    secondNumber = "";
    secondDisplayNumber.textContent = operator + " ";
  } else {
    firstNumber = "";
    firstDisplayNumber.textContent = "0";
    secondDisplayNumber.textContent = "";
  }
};

//clear all input
allClear = function () {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  result = "";
  firstDisplayNumber.textContent = "0";
  secondDisplayNumber.textContent = "";
  resultDisplayNumber.textContent = "";
  operationStarted = false;
  operatorSelected = false;
};

clearButton.addEventListener("click", clear);
allClearButton.addEventListener("click", allClear);
