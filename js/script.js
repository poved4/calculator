"use strict";

class Calculator {
    #operations = {
        "+": (x, y) => x + y,
        "-": (x, y) => x - y,
        "*": (x, y) => x * y,
        "/": (x, y) => y > 0 ? x / y : 'Math Error'
    }

    constructor(currentOperation, resultOperation) {
        this.currentOperation = document.getElementById(currentOperation);
        this.resultOperation = document.getElementById(resultOperation);
        this.ac();
    }

    ac() {
        this.x = undefined; 
        this.y = undefined;
        this.result = '';
        this.currentOperator = '';
        this.operation = undefined;
        this.prevOperator = undefined;
        
        this.updateDisplay();
    }

    del() { this.operation = this.operation.toString().slice(0, -1); }

    equals() {
        this.calculate();
        this.updateDisplay();
    }
    
    calculate (operator) { this.#operations[operator](this.x, this.y); }

    addOperator(operator) {
        if(this.currentOperator === operator) return

        if(this.currentOperator === undefined) this.currentOperator = operator;
        else { 
            this.prevOperator = this.currentOperator;
            this.currentOperator = operator;
            this.calculate(this.prevOperator);
        }

        this.updateDisplay();
    }

    addNumber(number) {

        this.updateDisplay();
    }

    updateDisplay() {
        this.resultOperation.innerHTML = this.result;
        this.currentOperation.innerHTML = this.currentOperator;
    }
}

const calculator = new Calculator('currentOperation', 'resultOperation')

const methods = {
    "allClear":   ()  => { calculator.ac(); },
    "delete":     ()  => { calculator.del(); },
    "equals":     ()  => { calculator.equals(); },
    "number":     (x) => { calculator.addNumber(x); },
    "operation":  (x) => { calculator.addOperator(x); }
}

document.querySelectorAll('.controls button')
.forEach(button => {
    button.addEventListener('click', () => {
        methods[button.className || button.id](button.innerHTML);
    });
}); 