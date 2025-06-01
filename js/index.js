const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

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

// Efecto parallax sutil en el banner
window.addEventListener('scroll', function () {
  const banner = document.querySelector('.banner');
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  banner.style.transform = `translateY(${rate}px)`;
});

// Función para animar en grupos de 3
function setupAnimation() {
  const rows = document.querySelectorAll('.content-row');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 200); // retrasa cada fila 200ms más que la anterior
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  rows.forEach(row => {
    observer.observe(row);
  });
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', setupAnimation);

window.addEventListener("load", () => {
  // Animar botones con delay escalonado
  const buttons = document.querySelectorAll(".botones button");
  buttons.forEach((button, i) => {
    setTimeout(() => button.classList.add("show"), i * 200);
  });

  // Animar secciones con delay escalonado
  const secciones = document.querySelectorAll(".animar");
  secciones.forEach((seccion, i) => {
    setTimeout(() => seccion.classList.add("mostrar"), 500 + i * 300);
  });
});