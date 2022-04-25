const gallery = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#card").content;
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
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__description").textContent = item.name;
  cardElement.querySelector(".card__image").src = item.link;
  gallery.append(cardElement);
});



let closeButton = document.querySelector(".popup__close-button");
let editButton = document.querySelector(".profile__edit-button");
let editForm = document.querySelector(".popup__edit-form");
let popup = document.querySelector(".popup");
let likeButtons = document.querySelectorAll(".card__like-button");
let deleteButtons = document.querySelectorAll(".card__delete-button");


function handleCloseButton(){
  popup.classList.remove("popup_visible");

}
function handleEditButton(){
  popup.classList.add("popup_visible");
  let userName = document.querySelector(".profile__name").textContent;
  let userAbout = document.querySelector(".profile__occupation").textContent;
  let inputName = document.querySelector("#popup__input-name");
  let inputAbout = document.querySelector("#popup__input-about");
  inputName.value = userName;
  inputAbout.value = userAbout;
}
function handleSubmitForm(evt){
  evt.preventDefault();
  document.querySelector(".profile__name").textContent = document.querySelector("#popup__input-name").value;
  document.querySelector(".profile__occupation").textContent = document.querySelector("#popup__input-about").value;
  popup.classList.remove("popup_visible");
}
function handleLikeButton(evt){
  evt.target.classList.toggle("card__like-button_active");
}
function handleDeleteButton(evt){
  evt.target.parentElement.parentElement.remove();
}

closeButton.addEventListener("click", handleCloseButton);
editButton.addEventListener("click", handleEditButton);
editForm.addEventListener("submit", handleSubmitForm);
likeButtons.forEach(button=>{
  button.addEventListener("click", handleLikeButton);
});
deleteButtons.forEach(button=>{
  button.addEventListener("click", handleDeleteButton);
});