import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import {initialCards, configurationObject} from "./constants.js";
import "../pages/index.css";

import logoSrc from "../images/logo.svg";
const logo = document.querySelector(".header__logo");
logo.src = logoSrc;

// import faviconHref from "../favicon.ico";
// const fav = document.querySelector("#favicon");
// fav.href = faviconHref;

const cardTemplateSelector = "#card";
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editForm = document.querySelector(".edit-popup__form");
const addForm = document.querySelector(".add-popup__form");
const profileNameElement = document.querySelector(".profile__name");
const profileOccupationElement = document.querySelector(".profile__occupation");
const profileNameInputElement = document.querySelector("#edit-popup__input-name");
const profileOccupationInputElement = document.querySelector("#edit-popup__input-about");

const profileFormValidator = new FormValidator(configurationObject, editForm);
profileFormValidator.enableValidation();
const addFormValidator = new FormValidator(configurationObject, addForm);
addFormValidator.enableValidation();

const createNewCard = data=>{
  const cardElement = new Card(data, cardTemplateSelector, (evt)=>{
    const popup = new PopupWithImage(".picture-popup", data);
    popup.open();
  });
  return cardElement.getCard();
}

const cardsList = new Section({items:initialCards, renderer:(item)=>{
  const card = createNewCard(item);
  cardsList.addItem(card);
}}, ".gallery");
cardsList.renderItems();

const userInfo = new UserInfo({name:profileNameElement.textContent, occupation:profileOccupationElement.textContent});
const editProfilePopup = new PopupWithForm(".edit-popup", handleProfileEditForm);
const addCardPopup = new PopupWithForm(".add-popup", handleCardAddForm);

function handleProfileEditButton(){
  editProfilePopup.open();
  const userName = userInfo.getUserInfo().name;
  const userAbout = userInfo.getUserInfo().occupation;
  profileNameInputElement.value = userName;
  profileOccupationInputElement.value = userAbout;
  profileFormValidator.toggleButtonState();
}
function handleProfileEditForm(evt){
  evt.preventDefault();
  userInfo.setUserInfo({name:profileNameInputElement.value , occupation:profileOccupationInputElement.value});
  profileNameElement.textContent = userInfo.getUserInfo().name;
  profileOccupationElement.textContent = userInfo.getUserInfo().occupation;
  editProfilePopup.close();
}

function handleCardAddButton(){
  addCardPopup.open();
}
function handleCardAddForm(evt){
  evt.preventDefault();
  const link = document.querySelector("#add-popup__input-link").value;
  const name = document.querySelector("#add-popup__input-description").value;
  const card = createNewCard({name, link});
  cardsList.addItem(card);
  addCardPopup.close();
  addFormValidator.toggleButtonState();
}

editButton.addEventListener("click", handleProfileEditButton);
addButton.addEventListener("click", handleCardAddButton);