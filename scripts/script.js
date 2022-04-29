// Elements selecting
const editPopupCloseButton = document.querySelector(".edit-popup__close-button");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editForm = document.querySelector(".edit-popup__edit-form");
const addForm = document.querySelector(".add-popup__form");
const editPopup = document.querySelector(".edit-popup");
const picturePopup = document.querySelector(".picture-popup");
const addPopup = document.querySelector(".add-popup");
const gallery = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#card").content;

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
}

function closePopup(popup) {
  popup.classList.remove("popup_visible");
}

function handleCloseButton(evt){
  closePopup(evt.target.closest(".popup"));
}
function handleEditButton(){
  openPopup(editPopup);
  const userName = document.querySelector(".profile__name").textContent;
  const userAbout = document.querySelector(".profile__occupation").textContent;
  const inputName = document.querySelector("#edit-popup__input-name");
  const inputAbout = document.querySelector("#edit-popup__input-about");
  inputName.value = userName;
  inputAbout.value = userAbout;
}
function handleSubmitForm(evt){
  evt.preventDefault();
  document.querySelector(".profile__name").textContent = document.querySelector("#edit-popup__input-name").value;
  document.querySelector(".profile__occupation").textContent = document.querySelector("#edit-popup__input-about").value;
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
  document.querySelector(".picture-popup__image").src = link;
  document.querySelector(".picture-popup__image").alt = caption;
  document.querySelector(".picture-popup__caption").textContent = caption;
  document.querySelector(".picture-popup__close-button").addEventListener("click", handleCloseButton);
  openPopup(picturePopup);
}
function handleAddButton(){
  openPopup(addPopup);
  document.querySelector(".add-popup__close-button").addEventListener("click", handleCloseButton);
}
function handleAddform(evt){
  evt.preventDefault();
  const link = document.querySelector("#add-popup__input-link").value;
  const name = document.querySelector("#add-popup__input-description").value;
  renderCard({link, name});
  closePopup(addPopup);
  evt.target.reset();
}
// Event listeners binding with elements
editPopupCloseButton.addEventListener("click", handleCloseButton);
editButton.addEventListener("click", handleEditButton);
editForm.addEventListener("submit", handleSubmitForm);
addForm.addEventListener("submit", handleAddform);
addButton.addEventListener("click", handleAddButton);