const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let previousValue = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value) {
            appendValue(value);
        }

        if (action) {
            handleAction(action);
        }
    });
});

function appendValue(value) {
    if (currentInput.length > 15) return;
    currentInput += value;
    updateDisplay(currentInput);
}

function handleAction(action) {
    switch (action) {
        case "clear":
            clearAll();
            break;
        case "delete":
            deleteLast();
            break;
        case "equals":
            calculate();
            break;
        case "percent":
            percentage();
            break;
    }
}

function clearAll() {
    currentInput = "";
    previousValue = "";
    operator = "";
    updateDisplay("");
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

function calculate() {
    try {
        const result = Function(`return ${currentInput}`)();
        updateDisplay(result);
        currentInput = result.toString();
    } catch {
        updateDisplay("Error");
        currentInput = "";
    }
}

function percentage() {
    if (!currentInput) return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    display.value = value;
}
