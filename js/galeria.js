document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery .item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const subfilterButtons = document.querySelectorAll('.subfilter-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const dropdown = document.querySelector('.dropdown');
    const interioresBtn = document.getElementById('interioresBtn');
    const subfilterMenu = document.getElementById('subfilterMenu');

    let currentFilter = 'all';
    let currentSubfilter = 'all';
    lucide.createIcons();

    interioresBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
        currentFilter = 'interiores';
        currentSubfilter = 'all';
        filterGallery();
    });

    window.addEventListener('click', () => {
        dropdown.classList.remove('show');
    });

    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.filter !== 'interiores') {
                currentFilter = btn.dataset.filter;
                currentSubfilter = 'all';
                dropdown.classList.remove('show');
                filterGallery();
            }
        });
    });

    subfilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentSubfilter = btn.dataset.subfilter;
            filterGallery();
            dropdown.classList.remove('show');
        });
    });

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;
            if (view === 'original') {
                document.querySelector('.gallery').classList.remove('agrupada');
            } else {
                document.querySelector('.gallery').classList.add('agrupada');
                // Vista agrupada se implementará después
            }
        });
    });

    function filterGallery() {
        galleryItems.forEach(item => {
            const isInterior = item.classList.contains('interiores');
            const isExterior = item.classList.contains('exteriores');
            const matchesMain = currentFilter === 'all' || item.classList.contains(currentFilter);
            const matchesSub = currentSubfilter === 'all' || item.classList.contains(currentSubfilter);
            const show = matchesMain && (currentFilter !== 'interiores' || matchesSub);
            item.style.display = show ? 'block' : 'none';
        });
    }

    filterGallery();

    let currentIndex = 0;

    galleryItems.forEach((item) => {
        if (item.complete) {
            // Imagen ya cargada, se añade la clase
            item.classList.add('loaded');
        } else {
            // Si no, se añade el listener load
            item.addEventListener('load', () => {
                item.classList.add('loaded');
            });
        }

        item.addEventListener('click', () => {
            lightboxImg.src = item.src;
            lightbox.classList.add('show');
            currentIndex = Array.from(galleryItems).indexOf(item);
        });
    });


    function updateLightbox(index) {
        lightboxImg.src = galleryItems[index].src;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightbox(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox(currentIndex);
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });

    document.querySelector('.overlay').addEventListener('click', () => {
        lightbox.classList.remove('show');
    });

    window.onbeforeunload = () => {
        for (const form of document.getElementsByTagName('form')) {
            form.reset();
        }
    }

    window.onload = function () {
        document.querySelector('.menu ul').classList.add('show');
    };
});