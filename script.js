const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = null;
let firstOperand = null;

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-value');
        handleInput(value);
    });
});

document.getElementById('clear').addEventListener('click', clearAll);

document.getElementById('equals').addEventListener('click', () => {
    if (operator && firstOperand !== null) {
        calculate();
    }
});

function handleInput(value) {
    if (!isNaN(value) || value === '.') {
        // number or decimal
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
        updateDisplay(currentInput);
    } else if (['+', '-', '*', '/'].includes(value)) {
        // operator
        if (currentInput === '' && firstOperand !== null) {
            operator = value;
            return;
        }
        if (currentInput === '') return;
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            calculate();
            firstOperand = parseFloat(display.textContent);
        }
        operator = value;
        currentInput = '';
    }
}

function calculate() {
    let secondOperand = parseFloat(currentInput);
    let result;
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
    }
    displayResult(result);
    operator = null;
    currentInput = '';
    firstOperand = null;
}

function updateDisplay(text) {
    display.textContent = text;
}

function displayResult(result) {
    display.textContent = result;
}

function clearAll() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    updateDisplay('0');
}