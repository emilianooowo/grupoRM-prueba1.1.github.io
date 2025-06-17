const dynamicHeader = document.getElementById('dynamicHeader');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const scrollThreshold = 600;
let isScrolling = false;
let scrollTimer = null;

// Control de scroll para PC
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (window.innerWidth > 768) {
        // Lógica para PC
        if (scrollTop > scrollThreshold) {
            dynamicHeader.classList.add('visible');
        } else {
            dynamicHeader.classList.remove('visible');
            dynamicHeader.classList.remove('scrolling');
            return;
        }
    } else {
        // Lógica para móviles - mostrar botón hamburguesa
        if (scrollTop > scrollThreshold) {
            hamburgerBtn.classList.add('visible');
        } else {
            hamburgerBtn.classList.remove('visible');
        }
    }

    if (!isScrolling) {
        dynamicHeader.classList.add('scrolling');
        isScrolling = true;
    }

    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        dynamicHeader.classList.remove('scrolling');
        isScrolling = false;
    }, 150);
});

// Control del menú hamburguesa
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scroll para enlaces internos
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

// Configuración del Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -100px 0px', // Se activa cuando el elemento está 100px dentro del viewport
    threshold: 0.2 // Se activa cuando el 20% del elemento es visible
};

// Función para animar elementos
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

// Observer para elementos generales
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const target = entry.target;

            // Animar título
            if (target.classList.contains('title')) {
                animateElement(target);
            }

            // Animar botones de contacto
            if (target.classList.contains('contact-button-section')) {
                animateElement(target);
            }

            // Animar residencias con delay escalonado
            if (target.classList.contains('residencia-item')) {
                const allResidencias = document.querySelectorAll('.residencia-item');
                const index = Array.from(allResidencias).indexOf(target);
                animateElement(target, index * 150); // 150ms entre cada una
            }

            // Animar service items
            if (target.classList.contains('service-item')) {
                const image = target.querySelector('.service-image');
                const content = target.querySelector('.service-content');
                const connectingLine = target.querySelector('.connecting-line');

                // Animar imagen primero
                if (image) {
                    animateElement(image, 0);
                }

                // Animar contenido después
                if (content) {
                    animateElement(content, 200);
                }

                // Animar línea conectora
                if (connectingLine) {
                    animateElement(connectingLine, 400);
                }
            }

            if (target.classList.contains('mission-vision-content')) {
                animateElement(target);
            }

            // Animar imagen de misión
            if (target.classList.contains('mission-vision-image')) {
                animateElement(target);
            }

            // Animar sección de valores
            if (target.classList.contains('values-section')) {
                const title = target.querySelector('h1');
                const circles = target.querySelectorAll('.value-circle');

                if (title) {
                    animateElement(title, 0);
                }

                circles.forEach((circle, index) => {
                    animateElement(circle, (index + 1) * 100); // 100ms entre cada círculo
                });
            }
            // Dejar de observar el elemento una vez animado
            observer.unobserve(target);
        }
    });
}, observerOptions);

// Observer específico para línea conectora con configuración diferente
const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            lineObserver.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

// Función para inicializar las animaciones
function initScrollAnimations() {
    // Observar títulos
    const titles = document.querySelectorAll('.title');
    titles.forEach(title => {
        observer.observe(title);
    });

    // Observar botones de contacto
    const contactButtons = document.querySelectorAll('.contact-button-section');
    contactButtons.forEach(button => {
        observer.observe(button);
    });

    // Observar residencias
    const residencias = document.querySelectorAll('.residencia-item');
    residencias.forEach(residencia => {
        observer.observe(residencia);
    });

    // Observar cada service item
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        observer.observe(item);
    });

    // Observar línea conectora
    const connectingLine = document.querySelector('.connecting-line');
    if (connectingLine) {
        lineObserver.observe(connectingLine);
    }

    animateMissionAndValues();
}

// Función para efectos adicionales en hover (simplificado)
function addEnhancedEffects() {
    const serviceImages = document.querySelectorAll('.service-image');

    serviceImages.forEach(image => {
        // Solo efecto hover en las imágenes
        image.addEventListener('mouseenter', () => {
            const img = image.querySelector('img');
            if (img) {
                img.style.filter = 'grayscale(0%) contrast(1.3)';
            }
        });

        image.addEventListener('mouseleave', () => {
            const img = image.querySelector('img');
            if (img) {
                img.style.filter = 'grayscale(30%) contrast(1.2)';
            }
        });
    });
}

// Función para animaciones de carga retardada
function staggeredAnimations() {
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach((item, index) => {
        const delay = index * 200; // 200ms entre cada elemento
        item.style.animationDelay = `${delay}ms`;
    });
}

// Función para detectar si el usuario prefiere menos animaciones
function respectMotionPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Reducir duración de animaciones
        document.documentElement.style.setProperty('--animation-duration', '0.3s');

        // Eliminar animaciones complejas
        const complexAnimations = document.querySelectorAll('.image-wrapper');
        complexAnimations.forEach(el => {
            el.style.animation = 'none';
        });
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar soporte para Intersection Observer
    if ('IntersectionObserver' in window) {
        initScrollAnimations();
        addEnhancedEffects();
        staggeredAnimations();
        respectMotionPreferences();
    } else {
        // Fallback para navegadores que no soportan Intersection Observer
        console.warn('IntersectionObserver no soportado. Aplicando animaciones directamente.');

        // Aplicar todas las clases de animación inmediatamente
        const elementsToAnimate = document.querySelectorAll('.title, .service-image, .service-content, .connecting-line, .contact-button-section, .residencia-item, .mission-vision-content, .mission-vision-image, .values-section h1, .value-circle');
        elementsToAnimate.forEach(el => {
            el.classList.add('animate');
        });

    }
});

// Opcional: Función para reiniciar animaciones (útil para testing)
function resetAnimations() {
    const animatedElements = document.querySelectorAll('.animate, .mission-vision-content, .mission-vision-image, .values-section h1, .value-circle');
    animatedElements.forEach(el => {
        el.classList.remove('animate');
    });

    // Reinicializar después de un breve delay
    setTimeout(() => {
        initScrollAnimations();
    }, 200);
}

// Exportar funciones para uso externo si es necesario
window.scrollAnimations = {
    init: initScrollAnimations,
    reset: resetAnimations,
    addEffects: addEnhancedEffects
};