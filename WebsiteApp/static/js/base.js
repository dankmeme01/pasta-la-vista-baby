//! ========== BURGER ==========

const hamb = document.querySelector("#hamb")
const popup = document.querySelector("#popup")
const menu = document.querySelector("#menu").cloneNode(1);
const body = document.body

hamb.addEventListener("click", hambHandler);

function hambHandler(e) {
  e.preventDefault();
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");

  renderPopup();
}

function renderPopup() {
  popup.appendChild(menu);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

let hideHash = () => {
  setTimeout(() => {
    history.pushState("/", document.title, window.location.pathname
      + window.location.search);
  }, 10);
}

setTimeout(() => {
  $(".popup__reservation").css("transition", "all 0.5s ease 0s");
  $(".popup__cart").css("transition", "all 0.5s ease 0s");
}, 100);