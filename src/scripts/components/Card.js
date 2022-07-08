export default class Card{
  constructor(data, cardTemplateSelector, handleCardClick){
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }
  _generateCardElement=()=>{
    this._cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector(".card").cloneNode(true);
    this._cardElement.querySelector(".card__description").textContent = this._name;
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");
    return this._cardElement;
  }
  _handleLikeButton=(evt)=>{
    evt.target.classList.toggle("card__like-button_active");
  }
  _handleDeleteButton=(evt)=>{
    this._cardElement.remove();
    this._cardElement = null;
  }
  _addEventListeners=()=>{
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._imageElement.addEventListener("click", this._handleCardClick);
  }
  getCard=()=>{
    const card = this._generateCardElement();
    this._addEventListeners();
    return card;
  }
}