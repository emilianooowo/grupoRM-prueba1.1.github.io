window.addEventListener("load", function () {
    const buttons = document.querySelectorAll(".botones button");
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.add("show");
        }, index * 200);
    });

    const secciones = document.querySelectorAll(".animar");
    secciones.forEach((seccion, index) => {
        setTimeout(() => {
            seccion.classList.add("mostrar");
        }, 500 + index * 300);
    });
});

const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq => {
    const question = faq.querySelector(".question");

    question.addEventListener("click", () => {
        faq.classList.toggle("active");

        faqs.forEach(otherFaq => {
            if (otherFaq !== faq && otherFaq.classList.contains("active")) {
                otherFaq.classList.remove("active");
            }
        });
    });
});