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
    return (operator(x, y))
}

// console.log(operate(multiply, 3, 2));

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


clear = function() {
    if (operatorSelected) {
        secondNumber = ""
        secondDisplayNumber.textContent = (operator + " ")
    } else {
        firstNumber = ""
        firstDisplayNumber.textContent = "0"
    }
}


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