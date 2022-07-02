let sliderIndex = 0;
let maxTimer = 5000;
let intervalT = 250000;
let timer = maxTimer;
let direction = 'none';
let prevId = 0;

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
    sliderIndex = slides.length - 1

  let prevSlide = slides[prevId];
  let currSlide = slides[sliderIndex];

  for (let i = 0; i < slides.length; i++) {
    if (i === sliderIndex) continue;
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
    for (let class_ of ['slide_move_left', 'slide_move_right', 'slide_move_prev_left', 'slide_move_prev_right']) {
      slides[i].classList.remove(class_);
    }
  }

  currSlide.style.display = "block";
  prevSlide.style.display = "block";

  if (direction != 'none') {
    currSlide.classList.add(`slide_move_${direction}`);
    prevSlide.classList.add(`slide_move_prev_${direction}`);
  }

  dots[sliderIndex].classList.add("active");
  timer = maxTimer;
  prevId = sliderIndex;
}

function slideMove(n) {
  direction = n < 0 ? 'right' : 'left';
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