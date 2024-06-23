document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = null;
    let previousInput = null;
    let operatorClicked = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'AC') {
                currentInput = '';
                operator = null;
                previousInput = null;
                updateDisplay('0');
                return;
            }

            

            if (value === '%') {
                if (currentInput !== '') {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    updateDisplay(currentInput);
                }
                return;
            }

            if (value === 'backspace') {
                if (currentInput.length > 0) {
                    currentInput = currentInput.slice(0, -1);
                } else if (operator) {
                    operator = null;
                } else if (previousInput !== null) {
                    previousInput = previousInput.slice(0, -1);
                }
                updateDisplay(`${previousInput !== null ? previousInput + (operator ? ' ' + operator + ' ' : '') : ''}${currentInput || '0'}`);
                return;
            }

            if (value === '=') {
                if (operator && previousInput !== null) {
                    currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                    operator = null;
                    previousInput = null;
                }
                updateDisplay(currentInput);
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (operator && previousInput !== null && !operatorClicked) {
                    currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                }
                operator = value;
                previousInput = currentInput;
                operatorClicked = true;
                currentInput = '';
                updateDisplay(`${previousInput} ${operator}`);
                return;
            }

            if (operatorClicked) {
                currentInput = value;
                operatorClicked = false;
            } else {
                currentInput += value;
            }

            updateDisplay(`${previousInput !== null ? previousInput + ' ' + operator + ' ' : ''}${currentInput}`);
        });
    });

    function updateDisplay(value) {
        display.textContent = value;
    }

    function calculate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return b === 0 ? 'Error' : a / b;
            default:
                return b;
        }
    }
})
