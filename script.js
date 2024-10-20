//create initial functions
let add = (x, y) => x + y
let subtract = (x, y) => x - y
let multiply = (x, y) => x * y
let divide = (x, y) => x / y

let firstNumber
let operator
let secondNumber
let result
let operationStarted = false
let operatorSelected = false


let operate = function (operator, x, y) {
    switch (operator) {
        case '+':
            return add(x, y)
            break;
        
        case '-':
            return subtract(x, y)
            break;
        
        case '*':
            return multiply(x, y)
            break;
        
        case '/':
            return divide(x, y)
            break;

        default:
            return "ERROR"
    }
}

let firstDisplayNumber = document.querySelector(".firstNumber")
let secondDisplayNumber = document.querySelector(".secondNumber")
let resultDisplayNumber = document.querySelector(".result")
let inputButton = document.querySelectorAll(".input")
let decimalButton = document.querySelector(".decimal")
let clearButton = document.querySelector(".clear")
let allClearButton = document.querySelector(".allClear")
let equalsButton = document.querySelector(".equals")

function toggleDecimal(number) {
    number.includes('.') ? (decimalButton.disabled = true) : decimalButton.disabled = false
}

inputButton.forEach((input) => {
    input.addEventListener('click', (event) => {
        //take input value
        const inputText = event.target.textContent

        //generate first number
        if (input.classList.contains('number') && !operatorSelected) {
            firstNumber = (!firstNumber) ? inputText : (firstNumber + inputText)
            firstDisplayNumber.textContent = firstNumber
            toggleDecimal(firstNumber)
            operationStarted = true
        
        //select operator
        } else if (input.classList.contains('operator') && operationStarted) {
            if (!secondNumber) {
                operator = inputText
                secondDisplayNumber.textContent = (operator + " ")
                operatorSelected = true
            }

        //generate second number
        } else if (input.classList.contains('number') && operatorSelected) {
            secondNumber = (!secondNumber) ? inputText : (secondNumber + inputText)
            secondDisplayNumber.textContent = (operator + " " + secondNumber)
            toggleDecimal(secondNumber)
            operationStarted = true
        }
    })
})

//calculate result
equalsButton.addEventListener('click', () => {
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    //check for invalid input
    if (isNaN(secondNumber)) {
        secondDisplayNumber.textContent = (operator + " ERROR")
        return;
    }
    //calculate result
    result = operate(operator, firstNumber, secondNumber);
    
    //check for valid result
    if (isNaN(result) || result === Infinity) {
        secondDisplayNumber.textContent = (operator + " ERROR")
        secondNumber = "";
        return;
    }
    //set up for subsequent calculations
    firstNumber = result;
    secondNumber = "";
    //update display
    firstDisplayNumber.textContent = result;
    secondDisplayNumber.textContent = "";
})

//clear current input
clear = function() {
    if (operatorSelected) {
        secondNumber = ""
        secondDisplayNumber.textContent = (operator + " ")
    } else {
        firstNumber = ""
        firstDisplayNumber.textContent = "0"
    }
}

//clear all input
allClear = function() {
    firstNumber = ""
    operator = ""
    secondNumber = ""
    result = ""
    firstDisplayNumber.textContent = "0"
    secondDisplayNumber.textContent = ""
    resultDisplayNumber.textContent = ""
    operationStarted = false
    operatorSelected = false    
}

clearButton.addEventListener('click', clear)
allClearButton.addEventListener('click', allClear)