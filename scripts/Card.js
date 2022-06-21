import { openPopup } from "./utils.js";
export default class Card{
  constructor(data, cardTemplateSelector){
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
  }
  _generateCardElement(){
    this._cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector(".card").cloneNode(true);
    this._cardElement.querySelector(".card__description").textContent = this._name;
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");
    return this._cardElement;
  }
  _openImage(evt){
    const picturePopup = document.querySelector(".picture-popup");
    const link = evt.target.src;
    const caption = evt.target.alt;
    const imageElement = document.querySelector(".picture-popup__image");
    imageElement.src = link;
    imageElement.alt = caption;
    document.querySelector(".picture-popup__caption").textContent = caption;
    openPopup(picturePopup);
  }
  _handleLikeButton(evt){
    evt.target.classList.toggle("card__like-button_active");
  }
  _handleDeleteButton(evt){
    evt.target.closest(".card").remove();
  }
  _addEventListeners(){
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._imageElement.addEventListener("click", this._openImage);
  }
  getCard(){
    const card = this._generateCardElement();
    this._addEventListeners();
    return card;
  }
}