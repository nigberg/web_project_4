import Popup from "./Popup.js";
export default class ConfirmPopup extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._confirmForm = this._popup.querySelector(".form");
  }

  setCardDeleteFunction(deleteFunction){
    this._cardDeleteFunction = deleteFunction;
  }

  setCardToDelete(card){
    this._cardToDelete = card;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._cardDeleteFunction(this._cardToDelete);
    this.close();
  }
  open(){
    super.open();
    this._confirmForm.addEventListener("submit", this._handleSubmit);
  }

  close(){
    super.close();
    this._confirmForm.removeEventListener("submit", this._handleSubmit);
  }
}
