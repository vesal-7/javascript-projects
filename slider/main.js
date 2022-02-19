const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = true; // Auto scroll, it is optional
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
  // Get current class
  console.log(this)
  const current = document.querySelectorAll('.current');
  // Remove current class
  current[0].classList.remove('current');
  current[1].classList.remove('current');
  // Check for next slide
  if (current[0].nextElementSibling) {
    // Add current to next sibling
    current[0].nextElementSibling.classList.add('current');
    current[1].nextElementSibling.classList.add('current');
  } else {
    // Add current to start
    slides[0].classList.add('current');
    dots[0].classList.add('current');
  }
  //console.log(current)
 // setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
  
  const current = document.querySelectorAll('.current');
  current[0].classList.remove('current');
  current[1].classList.remove('current');
  if (current[0].previousElementSibling) {
    current[0].previousElementSibling.classList.add('current');
    current[1].previousElementSibling.classList.add('current');
  } else {
    // Add current to last
    slides[slides.length - 1].classList.add('current');
    dots[dots.length - 1].classList.add('current');
  }
  //setTimeout(() => current.classList.remove('current'));
};

// Button events
next.addEventListener('click', e => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener('click', e => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

// Auto slide
if (auto) {
  // Run next slide at interval time
  slideInterval = setInterval(nextSlide, intervalTime);
}
