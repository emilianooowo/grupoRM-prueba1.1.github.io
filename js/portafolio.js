const images = Array.from(document.querySelectorAll('.detail img'));
let currentIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const closeBtn = lightbox.querySelector('.close-btn');
const prevBtn = lightbox.querySelector('.prev-btn');
const nextBtn = lightbox.querySelector('.next-btn');

window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName('form')) {
        form.reset();
    }
};
window.onload = function () {
    document.querySelector('.menu ul').classList.add('show');
};
document.querySelectorAll('.project-card').forEach(card => {
    const thumb = card.querySelector('.thumb');
    thumb.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});


function showLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.classList.remove('hidden');
}

function hideLightbox() {
    lightbox.classList.add('hidden');
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
}

images.forEach((img, idx) => {
    img.addEventListener('click', () => showLightbox(idx));
});
closeBtn.addEventListener('click', hideLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) hideLightbox();
});