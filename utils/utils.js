function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopUp(openedPopup);
  }
}

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopUp(evt.target);
  }
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", (evt) => closeByEsc(evt, modal));
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEsc);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

export { closeByEsc, openPopUp, closePopUp };
