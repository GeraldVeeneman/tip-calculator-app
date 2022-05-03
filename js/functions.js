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
customTip.addEventListener("input", validateInput);

function validateInput() {
    
  const focusedElement = document.activeElement;
  
  const errorMessage = document.querySelector(
    "." + focusedElement.parentElement.className + " .error"
  );

  //TODO errorMesagge met closest toekennen
  
  if (focusedElement.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, remove the error message.
    errorMessage.textContent = ""; 
    errorMessage.className = "error"; // Reset the visual state of the message

    // If active element is custom-tip
    // then remove active class from tip button and add active class to custom tip
    // Assign custom-tip value to tipPercentage
    if(focusedElement.id == 'custom-tip') {
      tips.forEach((val) => {
        val.classList.remove("active");
      });
      focusedElement.classList.add("active");
      tipPercentage = focusedElement.value;
    }

    // Calculate tip and total per person
    calculate();
  } else {
    // If there is still an error, show the correct error
    showError(focusedElement, errorMessage);
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
      if (element.innerHTML == val.innerHTML) {
        val.classList.add("active");
        tipPercentage = `${element.value}`;
      }
    });
    calculate();
  })
})

resetButton.addEventListener("click", function () {
  bill.value = 0;
  numOfPeople.value=1;
  tipPercentage = 0;
  tips.forEach(val => {
    val.classList.remove("active");
  });
  customTip.value = "";
  tipAmount.textContent = "$0.00";
  total.textContent = "$0.00";
});


// document.addEventListener("click", (e) => {
//   let element = e.target;
//   // Only add active class to clicked button
//   if (element.type == "button") {
//     tips.forEach(val => {
//       val.classList.remove("active");
//       if (element.innerHTML == val.innerHTML) {
//         val.classList.add("active");
//         tipPercentage = `${element.value}`;
//       }
//     });
//     calculate();

//     // Reset all form fields if reset button has been clicked
//   } else if (element.type == "reset") {
//     bill.value=0;
//     numOfPeople.value=1;
//     tipPercentage = 0;
//     tips.forEach(val => {
//       val.classList.remove("active");
//     });
//     customTip.value = "";
//     tipAmount.textContent = "$0.00";
//     total.textContent = "$0.00";
//   }
// });

function showError(focusedElement, errorMessage) {
  
  if (focusedElement.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    errorMessage.textContent = "You need to enter an amount.";
  } else if (focusedElement.validity.badInput) {
    // If the field doesn't contain an amount in numbers,
    // display the following error message.
    errorMessage.textContent = "Value needs to be a number.";
  } else if (focusedElement.value == 0) {
      // If the amount is 0
      errorMessage.textContent = "Can't be zero.";
  } else if (focusedElement.validity.rangeUnderflow) {
    // If the amonut is below 0,
    // display the following error message.
    errorMessage.textContent = `Amount should be at least ${focusedElement.min}.`;
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
