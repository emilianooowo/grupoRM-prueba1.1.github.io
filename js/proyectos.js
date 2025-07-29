const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

function handleScroll() {
    const header = document.getElementById('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', handleScroll);

document.querySelectorAll('.border-effect').forEach(el => {
    const lines = ['bottom', 'right', 'top', 'left'];
    lines.forEach(dir => {
        const span = document.createElement('span');
        span.classList.add(`line-${dir}`);
        el.appendChild(span);
    });

    el.addEventListener('mouseenter', () => {
        const [bottom, right, top, left] = el.querySelectorAll('span');
        bottom.style.width = '100%';

        setTimeout(() => {
            right.style.height = '100%';
        }, 100);

        setTimeout(() => {
            top.style.width = '100%';
        }, 200);

        setTimeout(() => {
            left.style.height = '100%';
        }, 300);
    });

    el.addEventListener('mouseleave', () => {
        const [bottom, right, top, left] = el.querySelectorAll('span');
        bottom.style.width = '0%';
        right.style.height = '0%';
        top.style.width = '0%';
        left.style.height = '0%';
    });
});

let currentProject = null;
let currentImages = [];
let currentImageIndex = 0;

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const project = entry.target;
            project.classList.add('in-view');

            // Animar thumbnails con delay
            setTimeout(() => {
                const thumbnails = project.querySelectorAll('.thumbnail');
                thumbnails.forEach((thumb, index) => {
                    setTimeout(() => {
                        thumb.classList.add('animate');
                    }, index * 100);
                });
            }, 400);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
    initializeObserver();
    initializeThumbnails();
    initializeLightbox();
});

function initializeObserver() {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        observer.observe(project);
    });
}

function initializeThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            const project = this.closest('.project');
            const mainImage = project.querySelector('.main-image');
            const projectThumbnails = project.querySelectorAll('.thumbnail');

            mainImage.src = this.dataset.src;

            projectThumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initializeLightbox() {
    const mainImages = document.querySelectorAll('.main-image');
    const imageOverlays = document.querySelectorAll('.image-overlay');

    mainImages.forEach((img, index) => {
        img.addEventListener('click', function () {
            openLightbox(this);
        });
    });

    imageOverlays.forEach(overlay => {
        overlay.addEventListener('click', function () {
            const mainImage = this.parentElement.querySelector('.main-image');
            openLightbox(mainImage);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    document.getElementById('lightbox').addEventListener('click', function (e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
}

function openLightbox(clickedImage) {
    const project = clickedImage.closest('.project');
    const projectName = project.dataset.project;
    const thumbnails = project.querySelectorAll('.thumbnail');

    currentImages = Array.from(thumbnails).map(thumb => thumb.dataset.src);
    currentProject = projectName;

    const currentSrc = clickedImage.src;
    currentImageIndex = currentImages.findIndex(src => src === currentSrc);
    if (currentImageIndex === -1) currentImageIndex = 0;

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const sidebar = document.getElementById('lightbox-sidebar');

    lightboxImage.src = currentImages[currentImageIndex];

    sidebar.innerHTML = '';
    currentImages.forEach((src, index) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.className = 'lightbox-thumb';
        thumb.addEventListener('click', () => {
            switchLightboxImage(index);
        });

        if (index === currentImageIndex) {
            thumb.classList.add('active');
        }

        sidebar.appendChild(thumb);
    });

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function switchLightboxImage(index) {
    currentImageIndex = index;
    const lightboxImage = document.getElementById('lightbox-image');
    const sidebarThumbs = document.querySelectorAll('.lightbox-thumb');

    lightboxImage.src = currentImages[index];

    sidebarThumbs.forEach(thumb => thumb.classList.remove('active'));
    sidebarThumbs[index].classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProject = null;
    currentImages = [];
    currentImageIndex = 0;
}

document.addEventListener('keydown', function (e) {
    if (!document.getElementById('lightbox').classList.contains('active')) return;

    if (e.key === 'ArrowRight') {
        const nextIndex = (currentImageIndex + 1) % currentImages.length;
        switchLightboxImage(nextIndex);
    } else if (e.key === 'ArrowLeft') {
        const prevIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
        switchLightboxImage(prevIndex);
    }
});