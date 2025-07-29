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
