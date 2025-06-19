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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('dynamicHeader');
    const logoImg = document.getElementById('logoImg');

    const logoBlanco = 'shared/logos/logo-largo.png';
    const logoNegro = 'shared/logos/logo-largo-negro.webp';

    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 650) {
            header.classList.add('scrolled');
            logoImg.src = logoNegro;
        } else {
            header.classList.remove('scrolled');
            logoImg.src = logoBlanco;
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
    updateHeader();
});

document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 700) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

const heroImages = document.querySelectorAll('.hero-bg-image');
let currentImageIndex = 0;

function rotateImages() {
    heroImages[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    heroImages[currentImageIndex].classList.add('active');
}

setInterval(rotateImages, 5000);

const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -100px 0px',
    threshold: 0.3
};

function animateElement(element, delay = 0) {
    setTimeout(() => {
        element.classList.add('animate');
    }, delay);
}

function animateMissionAndValues() {
    const missionContent = document.querySelector('.mission-vision-content');
    const missionImage = document.querySelector('.mission-vision-image');
    const valuesSection = document.querySelector('.values-section');

    if (missionContent) {
        observer.observe(missionContent);
    }
    if (missionImage) {
        observer.observe(missionImage);
    }
    if (valuesSection) {
        observer.observe(valuesSection);
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const target = entry.target;

            if (target.classList.contains('title')) {
                animateElement(target);
            }

            if (target.classList.contains('service-item')) {
                const image = target.querySelector('.service-image');
                const content = target.querySelector('.service-content');
                const connectingLine = target.querySelector('.connecting-line');

                if (image) {
                    animateElement(image, 0);
                }

                if (content) {
                    animateElement(content, 200);
                }
            }

            if (target.classList.contains('mission-vision-content')) {
                animateElement(target);
            }

            if (target.classList.contains('mission-vision-image')) {
                animateElement(target);
            }

            if (target.classList.contains('values-section')) {
                const title = target.querySelector('h1');
                const circles = target.querySelectorAll('.value-circle');

                if (title) {
                    animateElement(title, 0);
                }

                circles.forEach((circle, index) => {
                    animateElement(circle, (index + 1) * 100);
                });
            }
            observer.unobserve(target);
        }
    });
}, observerOptions);


function initScrollAnimations() {
    const titles = document.querySelectorAll('.title');
    titles.forEach(title => {
        observer.observe(title);
    });

    const residencias = document.querySelectorAll('.residencia-item');
    residencias.forEach(residencia => {
        observer.observe(residencia);
    });

    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        observer.observe(item);
    });

    animateMissionAndValues();
}

function staggeredAnimations() {
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach((item, index) => {
        const delay = index * 150;
        item.style.animationDelay = `${delay}ms`;
    });
}

function respectMotionPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');

        const complexAnimations = document.querySelectorAll('.image-wrapper');
        complexAnimations.forEach(el => {
            el.style.animation = 'none';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        initScrollAnimations();
        addEnhancedEffects();
        staggeredAnimations();
        respectMotionPreferences();
    } else {
        console.warn('IntersectionObserver no soportado. Aplicando animaciones directamente.');

        const elementsToAnimate = document.querySelectorAll('.title, .service-image, .service-content, .connecting-line, .contact-button-section, .residencia-item, .mission-vision-content, .mission-vision-image, .values-section h1, .value-circle');
        elementsToAnimate.forEach(el => {
            el.classList.add('animate');
        });

    }
});

function resetAnimations() {
    const animatedElements = document.querySelectorAll('.animate, .mission-vision-content, .mission-vision-image, .values-section h1, .value-circle');
    animatedElements.forEach(el => {
        el.classList.remove('animate');
    });

    setTimeout(() => {
        initScrollAnimations();
    }, 200);
}

window.scrollAnimations = {
    init: initScrollAnimations,
    reset: resetAnimations,
    addEffects: addEnhancedEffects
};