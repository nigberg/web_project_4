export default class FormValidator{
  constructor(setting, formElement){
    this._settings = setting;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }
  _showInputError=(inputElement, errorMessage)=>{
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }
  _hideInputError=(inputElement)=>{
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
  }
  _toggleInputError=(inputElement)=>{
    if(!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else{
      this._hideInputError(inputElement);
    }
  }
  _hasInvalidInput=()=>{
    return this._inputList.some((inputElement)=>{
      return !inputElement.validity.valid;
    });
  }
  toggleButtonState=()=>{
    if(this._hasInvalidInput()){
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
    else{
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  _setEventListeners=()=>{
    this.toggleButtonState();
    this._inputList.forEach((element)=>{
    element.addEventListener("input", ()=>{
      this._toggleInputError(element);
      this.toggleButtonState();
    });
  });
  }

  enableValidation=()=>{
    this._formElement.addEventListener("submit", (evt)=>{
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}