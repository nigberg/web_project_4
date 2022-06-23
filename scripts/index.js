import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {openPopup, closePopup, handleCloseButton} from "./utils.js";
import {initialCards, configurationObject} from "./constants.js";

const cardTemplateSelector = "#card";
const editPopupCloseButton = document.querySelector(".edit-popup__close-button");
const addPopupCloseButton = document.querySelector(".add-popup__close-button");
const picturePopupCloseButton = document.querySelector(".picture-popup__close-button");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editForm = document.querySelector(".edit-popup__form");
const addForm = document.querySelector(".add-popup__form");
const editPopup = document.querySelector(".edit-popup");
const addPopup = document.querySelector(".add-popup");
const gallery = document.querySelector(".gallery");
const profileNameElement = document.querySelector(".profile__name");
const profileOccupationElement = document.querySelector(".profile__occupation");
const profileNameInputElement = document.querySelector("#edit-popup__input-name");
const profileOccupationInputElement = document.querySelector("#edit-popup__input-about");
const profileFormValidator = new FormValidator(configurationObject, editForm);
profileFormValidator.enableValidation();
const addFormValidator = new FormValidator(configurationObject, addForm);
addFormValidator.enableValidation();

initialCards.forEach((item)=>{
  renderCard(item);
});

function renderCard(data){
  const cardElement = new Card(data, cardTemplateSelector);
  const card = cardElement.getCard()
  gallery.prepend(card);
}

function handleEditButton(){
  openPopup(editPopup);
  const userName = profileNameElement.textContent;
  const userAbout = profileOccupationElement.textContent;
  profileNameInputElement.value = userName;
  profileOccupationInputElement.value = userAbout;
  profileFormValidator.toggleButtonState();
}
function handleSubmitForm(evt){
  evt.preventDefault();
  profileNameElement.textContent = profileNameInputElement.value;
  profileOccupationElement.textContent = profileOccupationInputElement.value;
  closePopup(editPopup);
}

function handleAddButton(){
  openPopup(addPopup);
  addFormValidator.toggleButtonState();
}
function handleAddForm(evt){
  evt.preventDefault();
  const link = document.querySelector("#add-popup__input-link").value;
  const name = document.querySelector("#add-popup__input-description").value;
  renderCard({link, name});
  closePopup(addPopup);
  evt.target.reset();
}
// Event listeners binding with elements
editPopupCloseButton.addEventListener("click", handleCloseButton);
addPopupCloseButton.addEventListener("click", handleCloseButton);
picturePopupCloseButton.addEventListener("click", handleCloseButton);
editButton.addEventListener("click", handleEditButton);
editForm.addEventListener("submit", handleSubmitForm);
addForm.addEventListener("submit", handleAddForm);
addButton.addEventListener("click", handleAddButton);