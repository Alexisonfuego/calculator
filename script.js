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

let operate = function (operator, x, y) {
    return (operator(x, y))
}

console.log(operate(multiply, 3, 2));
