"strict mode";
document.addEventListener("DOMContentLoaded", function () {
  const btnJoinUs = document.querySelector(".btn__join");
  const container = document.querySelector(".container");
  const widnowJoinUs = document.querySelector(".joinus");
  const navContainer = document.querySelector(".nav");

  btnJoinUs.addEventListener("click", function () {
    container.classList.toggle("hidden");
    widnowJoinUs.classList.toggle("hidden");
    container.classList.toggle("active");
    widnowJoinUs.classList.toggle("active");
  });


  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });
  const animationElement = document.querySelectorAll(".animation");
  animationElement.forEach((el) => observer.observe(el));

  //slider
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const slider = document.querySelector(".slider");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active")); //usuwamy ze wszytkich active class

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`) //dodajemu active w odpowiednie miejsce
      .classList.add("dots__dot--active");
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  //Event handlers

  btnRight.addEventListener("click", nextSlide); //curslide 1 wiec mamy -100% 0%
  btnLeft.addEventListener("click", prevSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
});
