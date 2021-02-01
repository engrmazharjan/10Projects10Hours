
const pwEl = document.getElementById('pw');
const copyEl = document.getElementById('copy');
const lenEl = document.getElementById('len');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');

let upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
let numbers = '0123456789';
let symbols = '!@#$%^&*()_+=';


// get random from Upper Letters
function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

// get random from Lower Letters
function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length )];
}

// get random froom Numbeers
function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

// get random from Symbols
function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}


// Generate Password
function generatePassword() {
    const len = lenEl.value;

    let password = '';
    
    if (upperEl.checked) {
        password += getUppercase();
    }

    if (lowerEl.checked) {
        password += getLowercase();
    }
    
    if (numberEl.checked) {
        password += getNumber();
    }

    if (symbolEl.checked) {
        password += getSymbol();
    }

    for(let i = password.length; i<len; i++) {
        const x = generateX();
        password += x;
    }
    pwEl.innerText = password;
}

// password array
function generateX(){
    const xs = [];

    if (upperEl.checked) {
        xs.push(getUppercase());
    }
    if (lowerEl.checked) {
        xs.push(getLowercase());
    }
    if (numberEl.checked) {
        xs.push(getNumber());
    }
    if (symbolEl.checked) {
        xs.push(getSymbol());
    }
    if (xs.length === 0) {
        return '';
    }
    return xs[Math.floor(Math.random() * xs.length)];
}

// Click to Generate Password Button
generateEl.addEventListener('click', generatePassword);

// copy password
copyEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = pwEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password Copied To Clipboard');
});