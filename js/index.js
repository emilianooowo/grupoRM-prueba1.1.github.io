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

// Función para animar en grupos de 3
function setupAnimation() {
  const rows = document.querySelectorAll('.content-row');

  // Agrupar filas de 3 en 3
  for (let i = 0; i < rows.length; i += 3) {
    const group = Array.from(rows).slice(i, i + 3);

    // Observar solo el primer elemento del grupo
    if (group.length > 0) {
      observer.observe(group[0]);

      // Cuando el primer elemento se anima, animar todo el grupo
      const firstRow = group[0];
      const originalCallback = () => {
        group.forEach((row, index) => {
          setTimeout(() => {
            row.classList.add('animate');
          }, index * 200); // 200ms de diferencia entre cada uno
        });
      };

      // Reemplazar el observer para este elemento
      const groupObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            originalCallback();
            groupObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      groupObserver.observe(firstRow);
    }
  }
}

const form = document.getElementById('contact-form');

form.addEventListener('submit', function (e) {
  // Limpiar errores anteriores
  const errors = this.querySelectorAll('.error');
  errors.forEach(error => error.textContent = '');

  let hasError = false;

  // Nombre: obligatorio y no vacío
  const nombre = this.querySelector('input[name="Nombre"]');
  if (!nombre.value.trim()) {
    this.querySelector('#error-nombre').textContent = 'El nombre es obligatorio.';
    hasError = true;
  }

  // Correo: obligatorio y válido
  const correo = this.querySelector('input[name="Correo"]');
  const correoVal = correo.value.trim();
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoVal) {
    this.querySelector('#error-correo').textContent = 'El correo es obligatorio.';
    hasError = true;
  } else if (!regexCorreo.test(correoVal)) {
    this.querySelector('#error-correo').textContent = 'Por favor ingresa un correo válido.';
    hasError = true;
  }

  // Mensaje: obligatorio y no vacío
  const mensaje = this.querySelector('textarea[name="Mensaje"]');
  if (!mensaje.value.trim()) {
    this.querySelector('#error-mensaje').textContent = 'El mensaje no puede estar vacío.';
    hasError = true;
  }

  if (hasError) {
    e.preventDefault(); // Detiene envío si hay error
  }
});

// Opción: limpiar mensajes de error al escribir
form.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', () => {
    const errorEl = form.querySelector(`#error-${input.name.toLowerCase()}`);
    if (errorEl) errorEl.textContent = '';
  });
});

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