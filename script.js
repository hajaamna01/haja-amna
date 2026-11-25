const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const opened = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const slides = [...document.querySelectorAll('.gallery-slide')];
const dots = [...document.querySelectorAll('#galleryDots button')];
const emptyGallery = document.getElementById('galleryEmpty');
let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}
function nextSlide() { showSlide(currentSlide + 1); }
function previousSlide() { showSlide(currentSlide - 1); }
function restartTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 10000);
}
document.getElementById('nextSlide').addEventListener('click', () => { nextSlide(); restartTimer(); });
document.getElementById('prevSlide').addEventListener('click', () => { previousSlide(); restartTimer(); });
dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); restartTimer(); }));

// إذا لم تكن الصور موجودة بعد، اعرض تنبيهاً إرشادياً بدلاً من مساحة فارغة.
const galleryImages = slides.map(slide => slide.querySelector('img'));
let loadedImages = 0;
galleryImages.forEach(img => {
  img.addEventListener('load', () => { loadedImages++; });
  img.addEventListener('error', () => {
    img.style.display = 'none';
    if (galleryImages.every(image => image.complete && !image.naturalWidth)) {
      emptyGallery.style.display = 'flex';
      document.getElementById('galleryDots').style.display = 'none';
      document.querySelector('.gallery-controls').style.display = 'none';
    }
  });
});
restartTimer();
