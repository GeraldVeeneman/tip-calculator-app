const form = document.getElementsByTagName('form')[0];
const bill = document.getElementById('bill');
const tips = document.querySelectorAll('.tip__button');
const customTip = document.getElementById('custom-tip');
const numOfPeople = document.getElementById('num-of-people');
const tipAmount = document.getElementById('tip-amount');
const total = document.getElementById('total');
let tipPercentage = 0;
const resetButton = document.getElementById('reset-button');

bill.addEventListener("input", validateInput);
numOfPeople.addEventListener("input", validateInput);
customTip.addEventListener("input", validateInputCustom);
resetButton.addEventListener("click", reset);

function validateInput(e) {

  const element = e.target;
  
  const errorMessage = document.querySelector(
    "." + element.parentElement.className + " .error"
  );

  if (element.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, remove the error message.
    errorMessage.textContent = ""; 
    errorMessage.className = "error"; // Reset the visual state of the message

    // Calculate tip and total per person
    calculate();
  } else {
    // If there is still an error, show the correct error
    showError(element, errorMessage);
  }
}

function validateInputCustom() {

  const errorMessage = document.querySelector(
    "." + customTip.parentElement.parentElement.className + " .error"
  );

  if (customTip.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, remove the error message.
    errorMessage.textContent = "";
    errorMessage.className = "error"; // Reset the visual state of the message

    // Remove active class from tip buttons and add active class to custom tip
    // Assign custom-tip value to tipPercentage
    tips.forEach((val) => {
      val.classList.remove("active");
    });
    customTip.classList.add("active");
    tipPercentage = customTip.value;

    // Calculate tip and total per person
    calculate();
  } else {
    // If there is still an error, show the correct error
    showError(customTip, errorMessage);
  }
}

// Tip buttons
// Set active tip button, assign tip percentage and
// calculate amounts per person
tips.forEach(item => {
  item.addEventListener('click', event => {
    let element = event.target;
     // Only add active class to clicked button     
    tips.forEach((val) => {
      val.classList.remove("active");
      customTip.classList.remove("active");
      if (element.innerHTML == val.innerHTML) {
        val.classList.add("active");
        tipPercentage = `${element.value}`;
      }
    });
    calculate();
  })
})

// Reset button
// Sets all fields to default value and removes active classes from tip buttons and custom tip
function reset() {
  bill.value = 0;
  numOfPeople.value=1;
  tipPercentage = 0;
  tips.forEach(val => {
    val.classList.remove("active");
  });
  customTip.classList.remove("active");
  customTip.value = "";
  tipAmount.textContent = "$0.00";
  total.textContent = "$0.00";
};


function showError(element, errorMessage) {

  // If a required field is empty
  if (element.validity.valueMissing) { 
    errorMessage.textContent = "Please enter an amount.";

    // If the field doesn't contain an amount in numbers
  } else if (element.validity.badInput) {
    errorMessage.textContent = "Value needs to be a number.";

    // If the amount is 0 
  } else if (element.value == 0) {
    errorMessage.textContent = "Can't be zero.";

    // If the amonut is below minimum
  } else if (element.validity.rangeUnderflow) {
    errorMessage.textContent = `Value should be at least  ${element.min}.`;
  }
}

function calculate() {
  let tipResult = 0;
  let totalResult = 0;

  // tipAmount = bill / number of people * (tip percentage / 100)
  tipResult = parseFloat(bill.value / numOfPeople.value * (tipPercentage/100)).toFixed(2);
  tipAmount.textContent = '$'+ tipResult;

  // total = (bill / number of people) + tipPerson
  totalResult = parseFloat(bill.value / numOfPeople.value + parseFloat(tipResult)).toFixed(2);
  total.textContent = "$" + totalResult;  
}
