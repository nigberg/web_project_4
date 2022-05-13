// Elements selecting
const editPopupCloseButton = document.querySelector(".edit-popup__close-button");
const addPopupCloseButton = document.querySelector(".add-popup__close-button");
const picturePopupCloseButton = document.querySelector(".picture-popup__close-button");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editForm = document.querySelector(".edit-popup__form");
const addForm = document.querySelector(".add-popup__form");
const editPopup = document.querySelector(".edit-popup");
const picturePopup = document.querySelector(".picture-popup");
const addPopup = document.querySelector(".add-popup");
const gallery = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#card").content;
const profileNameElement = document.querySelector(".profile__name");
const profileOccupationElement = document.querySelector(".profile__occupation");
const profileNameInputElement = document.querySelector("#edit-popup__input-name");
const profileOccupationInputElement = document.querySelector("#edit-popup__input-about");

// Gallery building start
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

initialCards.forEach(item=>{
  renderCard(item);
});

function createCard(card){
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__description").textContent = card.name;
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = card.link;
  imageElement.alt = card.name;
  imageElement.addEventListener("click", openImage);
  cardElement.querySelector(".card__like-button").addEventListener("click", handleLikeButton);
  cardElement.querySelector(".card__delete-button").addEventListener("click", handleDeleteButton);
  return cardElement;
}

function renderCard(card){
  const cardElement = createCard(card);
  gallery.prepend(cardElement);
}

function openPopup(popup) {
  popup.classList.add("popup_visible");
  document.addEventListener("keydown", handleKeyDown);
  popup.addEventListener("mousedown", handleMouseDown);
}

function closePopup(popup) {
  popup.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleKeyDown);
  popup.removeEventListener("mousedown", handleMouseDown);
}

function handleCloseButton(evt){
  closePopup(evt.target.closest(".popup"));
}

function handleKeyDown(evt){
  if(evt.key === "Escape"){
    const popupOpen = document.querySelector(".popup_visible");
    closePopup(popupOpen);
  }
}

function handleMouseDown(evt){
  const popupOpen = document.querySelector(".popup_visible");
  if(evt.target === popupOpen){
    closePopup(popupOpen);
  }
}

function handleEditButton(){
  openPopup(editPopup);
  const userName = profileNameElement.textContent;
  const userAbout = profileOccupationElement.textContent;
  profileNameInputElement.value = userName;
  profileOccupationInputElement.value = userAbout;
}
function handleSubmitForm(evt){
  evt.preventDefault();
  profileNameElement.textContent = profileNameInputElement.value;
  profileOccupationElement.textContent = profileOccupationInputElement.value;
  closePopup(editPopup);
}
function handleLikeButton(evt){
  evt.target.classList.toggle("card__like-button_active");
}
function handleDeleteButton(evt){
  evt.target.closest(".card").remove();
}
function openImage(evt){
  const link = evt.target.src;
  const caption = evt.target.alt;
  const imageElement = document.querySelector(".picture-popup__image");
  imageElement.src = link;
  imageElement.alt = caption;
  document.querySelector(".picture-popup__caption").textContent = caption;
  openPopup(picturePopup);
}
function handleAddButton(){
  openPopup(addPopup);
}
function handleAddform(evt){
  evt.preventDefault();
  const link = document.querySelector("#add-popup__input-link").value;
  const name = document.querySelector("#add-popup__input-description").value;
  renderCard({link, name});
  closePopup(addPopup);
  evt.target.reset();
  enableValidation(configurationObject);
}
// Event listeners binding with elements
editPopupCloseButton.addEventListener("click", handleCloseButton);
addPopupCloseButton.addEventListener("click", handleCloseButton);
picturePopupCloseButton.addEventListener("click", handleCloseButton);
editButton.addEventListener("click", handleEditButton);
editForm.addEventListener("submit", handleSubmitForm);
addForm.addEventListener("submit", handleAddform);
addButton.addEventListener("click", handleAddButton);