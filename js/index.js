let currentIndex = 0;
const totalQuestions = 5;
let canScroll = true;
let isInSection = false;
let scrollAccumulator = 0;
const scrollThreshold = 200;
let isTransitioning = false;

const section = document.getElementById('procesoSection');
const wrapper = document.getElementById('preguntasWrapper');
const items = document.querySelectorAll('.pregunta-item');
const dots = document.querySelectorAll('.progress-dot');

const imagenes = [
    "imgs/residencias/sen/residencia_sen_4.webp",
    "imgs/residencias/ab/residencia_ab_4.webp",
    "imgs/residencias/ab/residencia_ab_8.webp",
    "imgs/residencias/cont/residencia_cont_9.webp",
    "imgs/residencias/loft/residencia_loft_4.webp",
];

function updateActiveQuestion(index) {
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    const translateY = -index * (window.innerHeight - 120);
    wrapper.style.transform = `translateY(${translateY}px)`;

    const imagenElement = document.querySelector(".imagen-container img");
    imagenElement.src = imagenes[index];
}


function checkIfInSection() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    return rect.top <= windowHeight * 0.1 && rect.bottom >= windowHeight * 0.99;
}

function exitSection(direction) {
    if (isTransitioning) return;

    isTransitioning = true;
    isInSection = false;
    document.body.style.overflow = '';

    setTimeout(() => {
        if (direction === 'down') {
            window.scrollBy({
                top: window.innerHeight * 0.5,
                behavior: 'smooth'
            });
        } else {
            window.scrollBy({
                top: -window.innerHeight * 0.5,
                behavior: 'smooth'
            });
        }

        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }, 100);
}

function handleScroll(e) {
    if (isTransitioning) {
        e.preventDefault();
        return;
    }

    const wasInSection = isInSection;
    isInSection = checkIfInSection();

    if (isInSection) {
        e.preventDefault();

        if (!canScroll) return;

        scrollAccumulator += Math.abs(e.deltaY);

        if (scrollAccumulator >= scrollThreshold) {
            canScroll = false;
            scrollAccumulator = 0;

            const direction = e.deltaY > 0 ? 1 : -1;

            if (direction > 0) {
                if (currentIndex < totalQuestions - 1) {
                    currentIndex++;
                    updateActiveQuestion(currentIndex);
                } else {
                    exitSection('down');
                }
            } else {
                // Scroll hacia arriba
                if (currentIndex > 0) {
                    currentIndex--;
                    updateActiveQuestion(currentIndex);
                } else {
                    exitSection('up');
                }
            }

            setTimeout(() => {
                canScroll = true;
            }, 800);
        }
    } else if (wasInSection && !isInSection) {
        document.body.style.overflow = '';
    }
}

function handleKeydown(e) {
    if (!isInSection || !canScroll || isTransitioning) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        canScroll = false;

        if (currentIndex < totalQuestions - 1) {
            currentIndex++;
            updateActiveQuestion(currentIndex);
        } else {
            exitSection('down');
        }

        setTimeout(() => {
            canScroll = true;
        }, 800);
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        canScroll = false;

        if (currentIndex > 0) {
            currentIndex--;
            updateActiveQuestion(currentIndex);
        } else {
            exitSection('up');
        }

        setTimeout(() => {
            canScroll = true;
        }, 800);
    }
}

const procesoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
            document.body.style.overflow = 'hidden';
            isInSection = true;
            scrollAccumulator = 0;

            const rect = section.getBoundingClientRect();
            if (Math.abs(rect.top) > 8) {
                window.scrollTo({
                    top: window.scrollY + rect.top,
                    behavior: 'smooth'
                });
            }

            if (currentIndex !== 0) {
                currentIndex = 0;
                updateActiveQuestion(currentIndex);
            }
        }
    });
}, {
    threshold: [0.6]
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (isInSection && canScroll && !isTransitioning) {
            currentIndex = index;
            updateActiveQuestion(currentIndex);
        }
    });
});

procesoObserver.observe(section);

window.addEventListener('wheel', handleScroll, { passive: false });
window.addEventListener('keydown', handleKeydown);

window.addEventListener('resize', () => {
    updateActiveQuestion(currentIndex);
});

window.addEventListener('scroll', () => {
    if (!isInSection && !isTransitioning) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
            document.body.style.overflow = '';
        }
    }
});

let scrollTimeout;
window.addEventListener('wheel', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        scrollAccumulator = 0;
    }, 150);
});

let touchStartY = 0;
let touchEndY = 0;

section.addEventListener('touchstart', (e) => {
    if (!isInSection) return;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

section.addEventListener('touchmove', (e) => {
    if (!isInSection) return;
    touchEndY = e.touches[0].clientY;
}, { passive: true });

section.addEventListener('touchend', () => {
    if (!isInSection || !canScroll || isTransitioning) return;

    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) > 70) {
        canScroll = false;

        if (deltaY > 0) {
            if (currentIndex < totalQuestions - 1) {
                currentIndex++;
                updateActiveQuestion(currentIndex);
            } else {
                exitSection('down');
            }
        } else {
            if (currentIndex > 0) {
                currentIndex--;
                updateActiveQuestion(currentIndex);
            } else {
                exitSection('up');
            }
        }

        setTimeout(() => {
            canScroll = true;
        }, 800);
    }

    touchStartY = 0;
    touchEndY = 0;
});

updateActiveQuestion(0);

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

        if (scrollTop > 400) {
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

document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('proyectosGrid');

    if (!grid) return;

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            grid.classList.add('scrolled');
        } else {
            grid.classList.remove('scrolled');
        }
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

window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName('form')) {
        form.reset();
    }
}