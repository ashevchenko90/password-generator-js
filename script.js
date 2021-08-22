const charAmountNumber = document.getElementById("charAmountNumber");
const charAmountRange = document.getElementById('charAmountRange');
const form = document.getElementById('passGeneratorForm');

const upperElem = document.getElementById('uppercase');
const numberElem = document.getElementById('numbers');
const symbolElem = document.getElementById('symbols');

const copyEl = document.getElementById('copy');

const displayElem = document.getElementById('display');
const UPPER_CASE_CODE = arrayCode(65, 90);
const LOWER_CASE_CODE = arrayCode(97, 122);
const NUMBER_CASE_CODE = arrayCode(48, 57);
const SYMBOLS_CASE_CODE = [...arrayCode(33, 47), ...arrayCode(58, 64),
    ...arrayCode(91, 96), ...arrayCode(123, 126)
];

charAmountNumber.addEventListener('input', syncAmount);
charAmountRange.addEventListener('input', syncAmount);

form.addEventListener('submit', e => {
    e.preventDefault();
    const amount = charAmountNumber.value;
    const upper = upperElem.checked;
    const number = numberElem.checked;
    const symbol = symbolElem.checked;
    const password = generatePassword(amount, upper, number, symbol);
    displayElem.innerText = password;
    copyEl.classList.remove('hide');
});

function generatePassword(amount, upper, number, symbol) {
    let codePass = LOWER_CASE_CODE;
    if (upper) codePass = [...codePass, ...UPPER_CASE_CODE];
    if (number) codePass = [...codePass, ...NUMBER_CASE_CODE];
    if (symbol) codePass = [...codePass, ...SYMBOLS_CASE_CODE];
    const passCharacters = [];
    for (let i = 0; i < amount; i++) {
        const charCode = codePass[Math.floor(Math.random() * codePass.length)];
        passCharacters.push(String.fromCharCode(charCode));
    }
    return passCharacters.join('');

}

function arrayCode(start, finish) {
    const array = [];
    for (let i = start; i <= finish; i++) {
        array.push(i);
    }
    return array;
}

function syncAmount(e) {
    const value = e.target.value;
    charAmountNumber.value = value;
    charAmountRange.value = value;
}

copyEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const pass = displayElem.innerText;
    if (!pass) return;
    textarea.value = pass;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied");
});