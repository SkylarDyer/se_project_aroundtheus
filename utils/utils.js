function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEsc);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEsc);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    closePopUp(document.querySelector(".modal_opened"));
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

export { closeByEsc, openPopUp, closePopUp };

