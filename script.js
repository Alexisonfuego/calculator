//create initial functions
let add = function (x, y) {
    return x + y
}

let subtract = function (x, y) {
    return x - y
}

let multiply = function (x, y) {
    return x * y
}

let divide = function (x, y) {
    return x / y
}

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


inputButton.forEach((input) => {
    input.addEventListener('click', (event) => {
        //take input value
        const inputText = event.target.textContent

        //generate first number
        if (input.classList.contains('number') && !operatorSelected) {
            if (firstNumber === undefined) {
                firstNumber = inputText
                firstDisplayNumber.textContent = firstNumber
            } else {
                firstNumber = (firstNumber + inputText)
                firstDisplayNumber.textContent = firstNumber
            }
            operationStarted = true
        
        //select operator
        } else if (input.classList.contains('operator') && operationStarted) {
            if (secondNumber === undefined) {
                operator = inputText
                secondDisplayNumber.textContent = (operator + " ")
                operatorSelected = true
            }

        //generate second number
        } else if (input.classList.contains('number') && operationStarted) {
            if (secondNumber === undefined) {
                secondNumber = inputText
                secondDisplayNumber.textContent = (operator + " " + secondNumber)
            } else {
                secondNumber = (secondNumber + inputText)
                secondDisplayNumber.textContent = (operator + " " + secondNumber)
            }
            operationStarted = true
        }
    })
})








 //     if (firstNumber === undefined) {
    //         firstNumber = inputText
    //         firstDisplayNumber.textContent = firstNumber
    //     } else if (operatorSelected) {
    //         secondNumber = event.target.textContent
    //         secondDisplayNumber.textContent = (operator + " " + secondNumber)
    //     } else if (input.classList.contains('operator')) {
    //         operator = event.target.textContent
    //         operatorSelected = true
    //         secondDisplayNumber.textContent = (operator + " ")
    //     }
    //     else {
    //         firstNumber = (firstNumber + event.target.textContent)
    //         firstDisplayNumber.textContent = firstNumber
    //         }