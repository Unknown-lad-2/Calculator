class Calculator{
    constructor(current_screen,previous_screen){
        this.current_screen = current_screen;
        this.previous_screen = previous_screen;
        this.clear();
    }

    clear(){
        this.current_value = '';
        this.previous_value = '';
        this.operation = '';
    }

    delete(){
        //use slice to delete
        this.current_value = this.current_value.toString().slice(0,-1);
    }

    append_Number(number){
        if(number === '.' && this.current_value.includes('.'))
        return
        this.current_value = this.current_value.toString()+number.toString();
    }

    Operation(operation){
        if(this.current_value === '')
        return
        if(this.previous_value !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previous_value = this.current_value;
        this.current_value = '';
    }

    compute(){
        let result;
        const prev = parseFloat(this.current_value);
        const current = parseFloat(this.previous_value);

        if(isNaN(prev) || isNaN(current))
        return
        switch(this.operation){
            case '+':
                result = prev+current;
                break;
            case '-':
                result = prev-current;
                break;
            case '/':
                result = prev/current;
                break;
            case 'x':
                result = prev*current;
                break;
            case '%':
                result = prev%current;
                break;
            default:
                return;
        }
        this.current_value = result;
        this.operation = '';
        this.previous_value = '';
    }

    update_display(){
        this.current_screen.innerText = this.current_value;
        if(this.operation != null)
        this.previous_screen.innerText = this.previous_value+this.operation;
    }
}

const numbers_btns = document.querySelectorAll('[data-nums]');
const operations_btns = document.querySelectorAll('[data-calculation]');
const equal = document.getElementById("equal");
const del = document.getElementById("del");
const clear = document.querySelector('[data-clear]');
const current_screen = document.querySelector('[data-present_screen]');
const previous_screen = document.querySelector('[data-after_screen]');

var calculator = new Calculator(current_screen,previous_screen);

numbers_btns.forEach(buttons=>{
    buttons.addEventListener("click",()=>{
        calculator.append_Number(buttons.innerText);
        calculator.update_display();
    })
})

operations_btns.forEach(buttons=>{
    buttons.addEventListener("click",()=>{
        calculator.Operation(buttons.innerText);
        calculator.update_display();
    })
})

equal.addEventListener("click",()=>{
    calculator.compute();
    calculator.update_display();
})

clear.addEventListener("click",()=>{
    calculator.clear();
    calculator.update_display();
})

del.addEventListener("click",()=>{
    calculator.delete();
    calculator.update_display();
})