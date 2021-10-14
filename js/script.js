"use strict";

class Calculator {
    constructor () {
        this.operations = {
            "+": (x, y) => x + y,
            "-": (x, y) => x - y,
            "*": (x, y) => x * y,
            "/": (x, y) => y > 0 ? x / y : 'Math Error'
        }

        this.ac();
    }

    ac () {
        this.x = undefined; 
        this.y = undefined;
        this.operation = undefined;
        this.prevOperator = undefined;
        this.currentOperator = undefined;
    }

    del = () => this.operation = this.operation.toString().slice(0, -1);

    addOperator (operator) {
        if(this.currentOperator === operator) return

        if(this.currentOperator === undefined) this.currentOperator = operator;
        else { 
            this.prevOperator = this.currentOperator;
            this.currentOperator = operator;
            this.calculate(this.prevOperator);
        }
    }

    calculate = (operator) => this.operations[operator](this.x, this.y);
}

const calculator = new Calculator();