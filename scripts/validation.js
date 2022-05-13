// Configuration data
const configurationObject = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active"
};

// Main validation function call
enableValidation(configurationObject);

function isValid(formElement, inputElement, configurationObject){
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, configurationObject);
  }
  else{
    hideInputError(formElement, inputElement, configurationObject);
  }
}
function hasInvalidInput(inputList){
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement, configurationObject){
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(configurationObject.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else{
    buttonElement.classList.remove(configurationObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
function showInputError(formElement, inputElement, errorMessage, configurationObject){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configurationObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configurationObject.errorClass);
}
function hideInputError(formElement, inputElement, configurationObject){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configurationObject.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(configurationObject.errorClass);
}
function setEventListeners(formElement, configurationObject){
  const inputList = Array.from(formElement.querySelectorAll(configurationObject.inputSelector));
  const buttonElement = formElement.querySelector(configurationObject.submitButtonSelector);
  console.log(inputList);
  console.log(buttonElement);
  console.log(configurationObject.inputSelector);
  toggleButtonState(inputList, buttonElement, configurationObject);
  inputList.forEach((inputElement)=>{
    inputElement.addEventListener("input", function(){
      isValid(formElement, inputElement, configurationObject);
      toggleButtonState(inputList, buttonElement, configurationObject);
    });
  });
}
function enableValidation(configurationObject){
  const formtList = Array.from(document.querySelectorAll(configurationObject.formSelector));
  formtList.forEach((formElement)=>{
    formElement.addEventListener("submit", function(evt){
      evt.preventDefault();
    });
    setEventListeners(formElement, configurationObject);
  });
}