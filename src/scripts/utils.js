export function openPopup(popup) {
  popup.classList.add("popup_visible");
  document.addEventListener("keydown", handleKeyDown);
  popup.addEventListener("mousedown", handleMouseDown);
}

export function closePopup(popup) {
  popup.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleKeyDown);
  popup.removeEventListener("mousedown", handleMouseDown);
}

export function handleCloseButton(evt){
  closePopup(evt.target.closest(".popup"));
}

export function handleKeyDown(evt){
  if(evt.key === "Escape"){
    const popupOpen = document.querySelector(".popup_visible");
    closePopup(popupOpen);
  }
}

export function handleMouseDown(evt){
  const popupOpen = document.querySelector(".popup_visible");
  if(evt.target === popupOpen){
    closePopup(popupOpen);
  }
}