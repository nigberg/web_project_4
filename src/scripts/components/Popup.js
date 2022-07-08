export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
  }
  _handleEscClose = (evt)=>{
      if(evt.key === "Escape"){
        this.close();
      }
  }
  _handleButtonClose = ()=>{
    this.close();
  }
  _handleMouseDown = (evt)=>{
    if(evt.target === document.querySelector(".popup_visible")){
      this.close();
    }
  }
  open(){
    this._popup.classList.add("popup_visible");
    this.setEventListeners();
  }
  close(){
    this._popup.classList.remove("popup_visible");
    this.removeEventListeners();
  }
  setEventListeners(){
    this._closeButton.addEventListener("click", this._handleButtonClose);
    this._popup.addEventListener("mousedown", this._handleMouseDown);
    document.addEventListener("keydown", this._handleEscClose);
  }
  removeEventListeners(){
    this._closeButton.removeEventListener("click", this._handleButtonClose);
    this._popup.removeEventListener("mousedown", this._handleMouseDown);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}