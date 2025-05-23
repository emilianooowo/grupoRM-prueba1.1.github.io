const images = Array.from(document.querySelectorAll('.detail img'));
images.forEach(img => img.setAttribute('loading', 'lazy'));
let currentIndex = 0;

const loader = document.getElementById('loader');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const closeBtn = lightbox.querySelector('.close-btn');
const prevBtn = lightbox.querySelector('.prev-btn');
const nextBtn = lightbox.querySelector('.next-btn');

if (images.every(img => img.complete)) {
    loader.style.display = 'none';
} else {
    loader.style.display = 'flex';
}

function checkImagesLoaded() {
    let loadedCount = 0;
    images.forEach(img => {
        if (img.complete) loadedCount++;
    });
    if (loadedCount === images.length) {
        loader.style.display = 'none';
    }
}

images.forEach(img => {
    if (img.complete) {
        checkImagesLoaded();
    } else {
        img.addEventListener('load', checkImagesLoaded);
        img.addEventListener('error', checkImagesLoaded);
    }
});

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
    if (e.target === lightbox || e.target === lightboxImg) {
        hideLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') showNext();
        else if (e.key === 'ArrowLeft') showPrev();
        else if (e.key === 'Escape') hideLightbox();
    }
});