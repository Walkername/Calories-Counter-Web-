
const sexMale = document.querySelector('#gender-male');
const sexFemale = document.querySelector('#gender-female');

const inputAge = document.querySelector('#age');
const inputHeight = document.querySelector('#height');
const inputWeight = document.querySelector('#weight');

const switcherActivity = document.querySelector('.radios-group');

const computationButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');

const resultWindow = document.querySelector('.counter__result');

const caloriesNorm = resultWindow.querySelector('#calories-norm');
const caloriesMinimal = resultWindow.querySelector('#calories-minimal');
const caloriesMaximal = resultWindow.querySelector('#calories-maximal');
let coefftActivity = 1.2;

const stateComputation = () => {
    if (inputAge.value !== "" && inputHeight.value !== "" && inputWeight.value !== "") {
        computationButton.removeAttribute('disabled', 'true');
    } else {
        computationButton.setAttribute('disabled', 'true');
    }
    if (inputAge.value !== "" || inputHeight.value !== "" || inputWeight.value !== "") {
        resetButton.removeAttribute('disabled', 'true');
    } else {
        resetButton.setAttribute('disabled', 'true');
    }
};

const weightMain = (height, weight, age) => (10 * weight) + (6.25 * height) - (5 * age);

inputAge.addEventListener('input', () => {
    stateComputation();
});

inputHeight.addEventListener('input', () => {
    stateComputation();
});

inputWeight.addEventListener('input', () => {
    stateComputation();
});

switcherActivity.addEventListener('change', (evt) => {
    switch (evt.target.id) {
        case 'activity-minimal':
            coefftActivity = 1.2;
            break;
        case 'activity-low':
            coefftActivity = 1.375;
            break;
        case 'activity-medium':
            coefftActivity = 1.55;
            break;
        case 'activity-high':
            coefftActivity = 1.725;
            break;
        case 'activity-maximal':
            coefftActivity = 1.9;
            break;
    }
});

resetButton.addEventListener('reset', () => {
    sexMale.setAttribute('checked', 'true');
    sexFemale.removeAttribute('checked', 'true');
    inputAge.value = "";
    inputHeight.value = "";
    inputWeight.value = "";
    switcherActivity.querySelector('#activity-minimal').setAttribute('checked', 'true');
    switcherActivity.querySelector('#activity-low').removeAttribute('checked', 'true');
    switcherActivity.querySelector('#activity-medium').removeAttribute('checked', 'true');
    switcherActivity.querySelector('#activity-high').removeAttribute('checked', 'true');
    switcherActivity.querySelector('#activity-maximal').removeAttribute('checked', 'true');
});

computationButton.addEventListener('click', () => {
    const number = sexMale.checked ? 5 : -161;
    const result = Math.ceil((weightMain(inputHeight.value, inputWeight.value, inputAge.value) + number) * coefftActivity);
    resultWindow.classList.remove('counter__result--hidden');
    caloriesNorm.textContent = result;
    caloriesMinimal.textContent = Math.ceil(result - result * 0.15);
    caloriesMaximal.textContent = Math.ceil(result + result * 0.15);
});
