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
        //Display
        this.result = '';
        this.operation = '';

        //Operadores logicos
        this.prevOperator = undefined;
        this.currentOperator = undefined;
        
        this.updateDisplay();
    }

    del() { 
        this.operation = this.operation.toString().slice(0, -1); 
        this.updateDisplay();
    }

    calculate(isTrue = true) { 
        const symbol = isTrue ? this.currentOperator : this.prevOperator;
        const compute = this.operation.split(symbol);
        const x = parseFloat(compute[0]);
        const y = parseFloat(compute[1]);
        this.result = this.#operations[symbol](x, y); 
        
        if (!isTrue) { 
            this.prevOperator = undefined;
            this.operation = this.result.toString(); 
        }
        
        this.updateDisplay();
    }
    
    addOperator(operator) {
        if(this.currentOperator === operator) return

        if(this.currentOperator === undefined) this.currentOperator = operator;
        else { 
            this.prevOperator = this.currentOperator;
            this.currentOperator = operator;
            this.calculate(false);
        }

        this.operation += this.currentOperator;
        this.updateDisplay();
    }

    addNumber(number) {

        if (this.currentOperator === undefined) {
            if (number === '.' && this.operation.includes('.')) return;
        } else {
            const symbol = this.prevOperator === undefined ? this.currentOperator : this.prevOperator;
            const compute = this.operation.split(symbol);
            if (number === '.' && compute[1].includes('.')) return;
        }

        this.operation += number.toString();
        this.updateDisplay();
    }

    updateDisplay() {
        this.resultOperation.innerHTML = this.result;
        this.currentOperation.innerHTML = this.operation;
    }
}

const calculator = new Calculator('currentOperation', 'resultOperation')

const methods = {
    "allClear":   ()  => { calculator.ac(); },
    "delete":     ()  => { calculator.del(); },
    "equals":     ()  => { calculator.calculate(); },
    "number":     (x) => { calculator.addNumber(x); },
    "operation":  (x) => { calculator.addOperator(x); }
}

document.querySelectorAll('.controls button')
.forEach(button => {
    button.addEventListener('click', () => {
        methods[button.className || button.id](button.innerHTML);
    });
}); 