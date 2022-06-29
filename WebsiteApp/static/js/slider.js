var index = 0;

let dotc = $("#dots-con");
for (let i = 0; i < $(".slide").length; i++) {
  console.log("dot")
  dotc.append("<span class='dot'></span>");
}

let changeSlide = () => {
  var slides = document.querySelectorAll(".slide");
  var dots = document.querySelectorAll(".dot");
  console.log(dots)
  if (index > slides.length - 1)
    index = 0;

  if (index < 0)
    index = slides.length - 1;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
  }
  slides[index].style.display = "block";
  dots[index].classList.add("active");
}

function slideMove(n) {
  index += n;
  changeSlide();
}

changeSlide();