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

window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName('form')) {
        form.reset();
    }
}

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

function handleScroll() {
    const header = document.getElementById('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 500) {
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

const heroImages = [
    'assets/imgs/residencias/ab/residencia_ab_5.webp',
    'assets/imgs/residencias/sen/residencia_sen_7.webp',
    'assets/imgs/residencias/ab/residencia_ab_10.webp',
    'assets/imgs/residencias/cont/residencia_cont_3.webp'
];

let currentImageIndex = 0;
let heroBackgrounds = [];

function initHeroBackgrounds() {
    const heroSection = document.querySelector('.hero');

    for (let i = 0; i < heroImages.length; i++) {
        const bg = document.createElement('div');
        bg.className = 'hero-bg';
        bg.style.backgroundImage = `url(${heroImages[i]})`;
        heroSection.appendChild(bg);
        heroBackgrounds.push(bg);
    }

    heroBackgrounds[0].classList.add('active');
}

function changeHeroImage() {
    const current = heroBackgrounds[currentImageIndex];
    const nextIndex = (currentImageIndex + 1) % heroImages.length;
    const next = heroBackgrounds[nextIndex];

    current.classList.remove('active');
    current.classList.add('next');

    setTimeout(() => {
        next.classList.add('active');
        next.classList.remove('next');
    }, 100);

    setTimeout(() => {
        current.classList.remove('next');
    }, 2000);

    currentImageIndex = nextIndex;
}

initHeroBackgrounds();
setInterval(changeHeroImage, 5000);
const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
    card.addEventListener('click', () => {
        faqCards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('active')) {
                otherCard.classList.remove('active');
            }
        });

        card.classList.toggle('active');
    });
});