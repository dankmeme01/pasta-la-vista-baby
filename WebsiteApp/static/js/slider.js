let sliderIndex = 0;
let maxTimer = 5000;
let intervalT = 250;
let timer = maxTimer;

let dotc = $("#dots-con");
for (let i = 0; i < $(".slide").length; i++) {
  dotc.append("<span class='dot'></span>");
}

let changeSlide = () => {
  var slides = document.querySelectorAll(".slide");
  var dots = document.querySelectorAll(".dot");
  if (sliderIndex > slides.length - 1)
    sliderIndex = 0;

  if (sliderIndex < 0)
    sliderIndex = slides.length - 1;
  for (let i = 0; i < slides.length; i++) {
    if (i === sliderIndex) continue;
    setTimeout(() => {
      slides[i].style.display = "none";
    }, 500)
    dots[i].classList.remove("active");
  }
  slides[sliderIndex].style.display = "block";

  dots[sliderIndex].classList.add("active");
  timer = maxTimer;
}

function slideMove(n) {
  sliderIndex += n;
  changeSlide();
}

changeSlide();

setInterval(() => {
  timer -= intervalT;
  if (timer <= 0) {
    slideMove(1);
  }
}, intervalT);