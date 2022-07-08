import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
  constructor(popupSelector, {name, link}){
    super(popupSelector);
    this._imageName = name;
    this._imageUrl = link;
    this._caption = this._popup.querySelector(".picture-popup__caption");
  }
  open(){
    super.open();
    this._image = this._popup.querySelector(".picture-popup__image");
    this._image.alt = this._imageName;
    this._image.src = this._imageUrl;
    this._caption.textContent = this._imageName;
  }
}