import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import ConfirmPopup from "../scripts/components/ConfirmPopup.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { configurationObject } from "../scripts/utils/constants.js";
import { api } from "../scripts/components/Api.js";
import "./index.css";

import logoSrc from "../images/logo.svg";
const logo = document.querySelector(".header__logo");
logo.src = logoSrc;
import editSrc from "../images/edit.svg";
const edit = document.querySelector(".profile__avatar-edit-image");
edit.src = editSrc;

const cardTemplateSelector = "#card";
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarChangeButton = document.querySelector(".profile__avatar");
const editForm = document.querySelector(".edit-popup__form");
const addForm = document.querySelector(".add-popup__form");
const avatarChangeForm = document.querySelector(".avatar-change-popup__form");
const profileNameSelector = ".profile__name";
const profileNameElement = document.querySelector(profileNameSelector);
const profileOccupationSelector = ".profile__occupation";
const profileAvatarSelector = ".profile__avatar";
const profileOccupationElement = document.querySelector(
  profileOccupationSelector
);
const profileNameInputElement = document.querySelector(
  "#edit-popup__input-name"
);
const profileOccupationInputElement = document.querySelector(
  "#edit-popup__input-about"
);

const editProfilePopup = new PopupWithForm(".edit-popup", handleProfileEditForm);
const addCardPopup = new PopupWithForm(".add-popup", handleCardAddForm);
const avatarChangePopup = new PopupWithForm(".avatar-change-popup", handleAvatarChangeForm);
const confirmPopup = new ConfirmPopup(".confirm-popup");

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  occupationSelector: profileOccupationSelector,
  avatarSelector: profileAvatarSelector
});

let userId = "";

//User info fetching from server and updating on page
(function updateUserInfo() {
  api
    .getUserInfo()
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      userId = res._id;
      return userInfo.getUserInfo();
    })
    .then(console.log);
})();

//Editing user info on server and immediatelly updating it on page
function editUserInfo(data) {
  editProfilePopup.renderWaiting(true);
  api
    .editProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .catch(console.log)
    .finally(() => {editProfilePopup.renderWaiting(false);}
    );
}

const profileFormValidator = new FormValidator(configurationObject, editForm);
profileFormValidator.enableValidation();
const addFormValidator = new FormValidator(configurationObject, addForm);
addFormValidator.enableValidation();
const avatarChangeFormValidator = new FormValidator(configurationObject, avatarChangeForm);
avatarChangeFormValidator.enableValidation();

const createNewCard = (data) => {
  const cardElement = new Card(
    data,
    userId,
    cardTemplateSelector,
    (evt) => {
      const popup = new PopupWithImage(".picture-popup", data);
      popup.open();
    },
    function () {
      //like button handler
      if (!this.isLikedByOwner()) {
        api.addLike(this.getId()).then((res) => {
          this.setLikes(res.likes);
        });
      } else {
        api.removeLike(this.getId()).then((res) => {
          this.setLikes(res.likes);
        });
      }
    },
    function () {
      //delete button handler
      confirmPopup.open();
      confirmPopup.setCardDeleteFunction((card) => {
        api
          .deleteCard(card.getId())
          .then((res) => {
            card.removeCardFromDom();
          })
          .catch(console.log);
        }
      );
      confirmPopup.setCardToDelete(this);
    }
  );
  return cardElement.getCard();
};

const cardsList = new Section((item) => {
  const card = createNewCard(item);
  cardsList.addItem(card);
}, ".gallery");

//Initial card fetching and rendering on page
api.getInitialCards().then((res) => {
  cardsList.renderItems(res);
});

function handleProfileEditButton() {
  editProfilePopup.open();
  const { name: userName, occupation: userAbout } = userInfo.getUserInfo();
  profileNameInputElement.value = userName;
  profileOccupationInputElement.value = userAbout;
  profileFormValidator.toggleButtonState();
}

function handleProfileEditForm(evt) {
  evt.preventDefault();
  const newUserData = {
    name: profileNameInputElement.value,
    about: profileOccupationInputElement.value,
  };
  editUserInfo(newUserData);
  editProfilePopup.close();
}

function handleCardAddButton() {
  addCardPopup.open();
}
function handleCardAddForm(evt) {
  const link = document.querySelector("#add-popup__input-link").value;
  const name = document.querySelector("#add-popup__input-description").value;
  addCardPopup.renderWaiting(true);
  api
    .addNewCard(name, link)
    .then((res) => {
      cardsList.addItem(createNewCard(res));
    })
    .catch(console.log)
    .finally(() => {addCardPopup.renderWaiting(false);});
  addCardPopup.close();
  addFormValidator.toggleButtonState();
}

function handleAvatarChangeButton(){
  avatarChangePopup.open();
}

function handleAvatarChangeForm(evt){
  evt.preventDefault();
  const link = document.querySelector("#avatar-change-popup__input-link").value;
  avatarChangePopup.renderWaiting(true);
  api.setAvatar(link)
  .then(res => {
    userInfo.setAvatar(res.avatar);
    console.log(res.avatar);
  })
  .catch(console.log)
  .finally(() => {avatarChangePopup.renderWaiting(false);});
  avatarChangePopup.close();
  addFormValidator.toggleButtonState();
}

editButton.addEventListener("click", handleProfileEditButton);
addButton.addEventListener("click", handleCardAddButton);
avatarChangeButton.addEventListener("click", handleAvatarChangeButton);
