import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".form");
  }
  _getInputValues = () => {
    this._inputList = Array.from(this._form.querySelectorAll(".form__input"));
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
}
