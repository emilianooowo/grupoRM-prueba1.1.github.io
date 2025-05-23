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
    const loader = document.getElementById('loader');

    let currentFilter = 'all';
    let currentSubfilter = 'all';
    lucide.createIcons();

    // Mostrar loader al inicio
    loader.style.display = 'flex';

    function checkImagesLoaded() {
        // Solo cuenta las imágenes visibles
        const visibles = Array.from(galleryItems).filter(item => item.style.display !== 'none');
        if (visibles.length === 0) {
            loader.style.display = 'none';
            return;
        }
        let loadedCount = 0;
        visibles.forEach(item => {
            if (item.complete) loadedCount++;
        });
        if (loadedCount === visibles.length) {
            loader.style.display = 'none';
        } else {
            loader.style.display = 'flex';
        }
    }

    interioresBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        loader.style.display = 'flex';
        dropdown.classList.toggle('show');
        currentFilter = 'interiores';
        currentSubfilter = 'all';
        filterGallery();
    });

    window.addEventListener('click', () => {
        dropdown.classList.remove('show');
    });

    subfilterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            loader.style.display = 'flex';
            currentFilter = 'interiores';
            currentSubfilter = btn.dataset.subfilter;
            filterGallery();
            dropdown.classList.remove('show');
        });
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            loader.style.display = 'flex';
            currentFilter = btn.dataset.filter;
            currentSubfilter = 'all';
            filterGallery();
            dropdown.classList.remove('show');
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
        checkImagesLoaded();
    }

    filterGallery();

    let currentIndex = 0;

    galleryItems.forEach((item) => {
        if (item.complete) {
            item.classList.add('loaded');
            checkImagesLoaded();
        } else {
            item.addEventListener('load', () => {
                item.classList.add('loaded');
                checkImagesLoaded();
            });
            item.addEventListener('error', checkImagesLoaded);
        }

        item.addEventListener('click', () => {
            lightboxImg.src = item.src;
            lightbox.classList.add('show');
            currentIndex = Array.from(galleryItems).indexOf(item);
        });
    });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'Escape') closeBtn.click();
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


    window.onload = function () {
        document.querySelector('.menu ul').classList.add('show');
    };
});