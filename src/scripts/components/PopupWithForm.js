import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".form");
    this._submitButton = this._popup.querySelector(".form__submit-button");
    this._formInputs = this._form.querySelectorAll(".form__input");
    this._submitButtonDefaultText = this._submitButton.textContent;
    this._submitButtonWaitingText = "Saving...";
  }

  _getInputValues = () => {
    this._inputList = Array.from(this._formInputs);
    const result = {};
    this._inputList.forEach((item) => {
      result[item.name] = item.value;
    });
    return result;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderWaiting(isWaiting){
    if(isWaiting){
      this._submitButton.textContent = this._submitButtonWaitingText;
    }
    else{
      this._submitButton.textContent = this._submitButtonDefaultText;
    }

  }
}
