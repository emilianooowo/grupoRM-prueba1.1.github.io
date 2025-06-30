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

    // Cambiar imagen
    const imagenElement = document.querySelector(".imagen-container img");
    imagenElement.src = imagenes[index];
}


function checkIfInSection() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    return rect.top <= windowHeight * 0.1 && rect.bottom >= windowHeight * 0.99;
}

// Salir del section suavemente
function exitSection(direction) {
    if (isTransitioning) return;

    isTransitioning = true;
    isInSection = false;
    document.body.style.overflow = '';

    setTimeout(() => {
        if (direction === 'down') {
            // Ir al siguiente contenido
            window.scrollBy({
                top: window.innerHeight * 0.5,
                behavior: 'smooth'
            });
        } else {
            // Ir al contenido anterior
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

// Controla el scroll con acumulador para reducir sensibilidad
function handleScroll(e) {
    if (isTransitioning) {
        e.preventDefault();
        return;
    }

    const wasInSection = isInSection;
    isInSection = checkIfInSection();

    if (isInSection) {
        // Dentro del section - bloquear scroll normal
        e.preventDefault();

        if (!canScroll) return;

        // Acumular scroll para reducir sensibilidad
        scrollAccumulator += Math.abs(e.deltaY);

        if (scrollAccumulator >= scrollThreshold) {
            canScroll = false;
            scrollAccumulator = 0;

            const direction = e.deltaY > 0 ? 1 : -1;

            if (direction > 0) {
                // Scroll hacia abajo
                if (currentIndex < totalQuestions - 1) {
                    currentIndex++;
                    updateActiveQuestion(currentIndex);
                } else {
                    // Ya estamos en la última pregunta, salir suavemente
                    exitSection('down');
                }
            } else {
                // Scroll hacia arriba
                if (currentIndex > 0) {
                    currentIndex--;
                    updateActiveQuestion(currentIndex);
                } else {
                    // Ya estamos en la primera pregunta, salir suavemente
                    exitSection('up');
                }
            }

            setTimeout(() => {
                canScroll = true;
            }, 800);
        }
    } else if (wasInSection && !isInSection) {
        // Saliendo del section
        document.body.style.overflow = '';
    }
}

// Manejo de teclas de flecha
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

// Observer para detectar cuando entramos al section
const procesoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
            // Entrando al section
            document.body.style.overflow = 'hidden';
            isInSection = true;
            scrollAccumulator = 0;

            // Centrar el section en la ventana suavemente
            const rect = section.getBoundingClientRect();
            if (Math.abs(rect.top) > 8) {
                window.scrollTo({
                    top: window.scrollY + rect.top,
                    behavior: 'smooth'
                });
            }

            // Resetear a la primera pregunta si es necesario
            if (currentIndex !== 0) {
                currentIndex = 0;
                updateActiveQuestion(currentIndex);
            }
        }
    });
}, {
    threshold: [0.8]
});

// Manejo de clicks en los dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (isInSection && canScroll && !isTransitioning) {
            currentIndex = index;
            updateActiveQuestion(currentIndex);
        }
    });
});

procesoObserver.observe(section);

// Event listeners
window.addEventListener('wheel', handleScroll, { passive: false });
window.addEventListener('keydown', handleKeydown);

window.addEventListener('resize', () => {
    updateActiveQuestion(currentIndex);
});

// Detectar cuando se sale del section por scroll normal
window.addEventListener('scroll', () => {
    if (!isInSection && !isTransitioning) {
        const rect = section.getBoundingClientRect();
        // Si el section no está visible, asegurar que el scroll esté desbloqueado
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
            document.body.style.overflow = '';
        }
    }
});

// Limpiar el acumulador si no hay scroll por un tiempo
let scrollTimeout;
window.addEventListener('wheel', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        scrollAccumulator = 0;
    }, 150);
});

// Soporte para scroll táctil en móviles
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

    if (Math.abs(deltaY) > 70) { // Umbral para detectar gesto
        canScroll = false;

        if (deltaY > 0) {
            // Desplazamiento hacia arriba (scroll hacia abajo)
            if (currentIndex < totalQuestions - 1) {
                currentIndex++;
                updateActiveQuestion(currentIndex);
            } else {
                exitSection('down');
            }
        } else {
            // Desplazamiento hacia abajo (scroll hacia arriba)
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

    // Resetear valores táctiles
    touchStartY = 0;
    touchEndY = 0;
});

// Inicializar
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

    if (!grid) return; // Asegura que el elemento exista

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


const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('formSubmit');
const successMsg = document.getElementById('formSuccess');
const errorMsg = document.getElementById('formError');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            successMsg.style.display = 'block';
            form.reset();
        } else {
            throw new Error('Error en envío');
        }

    } catch (error) {
        errorMsg.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar solicitud';
    }
});

window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName('form')) {
        form.reset();
    }
}