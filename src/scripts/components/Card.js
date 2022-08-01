export default class Card {
  constructor(data, userId, cardTemplateSelector, handleCardClick, handleLikeButton, handleDeleteButton) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton.bind(this);
    this._handleDeleteButton = handleDeleteButton.bind(this);
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
  }

  _generateCardElement = () => {
    this._cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardElement.querySelector(".card__description").textContent =
      this._name;
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._likesCountElement = this._cardElement.querySelector(".card__likes-count");
    this._likesCountElement.textContent = this._likes.length;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.style.visibility = (this._ownerId === this._userId) ? "visible" : "hidden";
    this._toggleLikeButton();
    return this._cardElement;
  };

  isLikedByOwner(){
    return this._likes.some(like => like._id === this._userId);
  }

  getId(){
    return this._id;
  }

  setLikes(newLikes){
    this._likes = newLikes;
    this._likesCountElement.textContent = this._likes.length;
    this._toggleLikeButton();
  }

  _toggleLikeButton(){
    if(this.isLikedByOwner()){
      this._likeButton.classList.add("card__like-button_active");
    }
    else{
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _addEventListeners = () => {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._imageElement.addEventListener("click", this._handleCardClick);
  };

  getCard = () => {
    const card = this._generateCardElement();
    this._addEventListeners();
    return card;
  };

  removeCardFromDom(){
    this._cardElement.remove();
    this._cardElement = null;
  }
}
