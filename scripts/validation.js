enableValidation();

function isValid(formElement, inputElement){
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  else{
    hideInputError(formElement, inputElement);
  }
}
function hasInvalidInput(inputList){
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement){
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add("form__submit-button_inactive");
    buttonElement.disabled = true;
  }
  else{
    buttonElement.classList.remove("form__submit-button_inactive");
    buttonElement.disabled = false;
  }
}
function showInputError(formElement, inputElement, errorMessage){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}
function hideInputError(formElement, inputElement){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
}
function setEventListeners(formElement){
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement)=>{
    inputElement.addEventListener("input", function(){
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}
function enableValidation(){
  const formtList = Array.from(document.querySelectorAll(".form"));
  formtList.forEach((formElement)=>{
    formElement.addEventListener("submit", function(evt){
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}