let result = '';
let operator = undefined;
let currentOperation = '';
let prevOperator = undefined;


const del = document.getElementById('delete');
const equals = document.getElementById('equals');
const allClear = document.getElementById('allClear');

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operation');

const operation = document.getElementById('currentOperation');
const operationResult = document.getElementById('operationResult');


function updateDisplay() {
    operation.innerHTML = currentOperation;
    operationResult.innerHTML = result;
}

function compute() {
    let computation;
    const z = prevOperator === undefined ? operator : prevOperator;
    let numbers = currentOperation.split(z);
    
    const x = parseFloat(numbers[0]);
    const y = parseFloat(numbers[1]);

    switch (z) {
        case '+': computation = x + y; break;
        case '-': computation = x - y; break;
        case '*': computation = x * y; break;
        case '/': if(y !== 0) computation = x / y; else computation = 'Math Error'; break;
        default: computation = 'Math Error'; break;
    }

    if (prevOperator !== undefined) { 
        prevOperator = undefined;
        currentOperation = `${computation}`; 
    }
    result = computation;
}


/* --Get Numbers Buttons List-- */
numbers.forEach(button => {
    /* --Add Listener to Buttons-- */
    button.addEventListener('click', () => { 
        
        /* Append Numbers to Current Operation */
        const number = button.innerText;
        if(number === '.' && currentOperation.includes('.')) return
        currentOperation += number.toString();
        updateDisplay();
    });
}); 

/* --Get Operator Buttons List-- */
operators.forEach(button => {
    /* --Add Listener to Buttons-- */
    button.addEventListener('click', () => {

        const btnValue = button.innerText;

        /* Is the current operator the same as the new operator */
        if(operator === btnValue) return
        
        /* the current operator is equal to undefined, it does assign new value */
        if (operator === undefined) { operator = btnValue; }
        else { 
            /* 
                the current operator is not equal to undefined. 
                assign the value of the current operator to the previous one.
                call the function compute.
            */
            prevOperator = operator; 
            operator = btnValue; 
            compute();
        }
        
        currentOperation += operator.toString();
        updateDisplay();
    });
});

equals.addEventListener('click', () => {
    compute();
    updateDisplay();
});

allClear.addEventListener('click', () => {
    result = '';
    operator = undefined;
    currentOperation = '';
    prevOperator = undefined;
    updateDisplay();
});

del.addEventListener('click', () => {
    currentOperation = currentOperation.toString().slice(0, -1);
    updateDisplay();
});