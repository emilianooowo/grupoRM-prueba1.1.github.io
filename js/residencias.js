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

const albumsData = {
    'residencial-los-pinos': {
        title: 'Residencia de lujo',
        photos: 6,
        coverImage: 'imgs/residencias/ab/residencia_ab_5.webp',
        images: [
            'imgs/residencias/ab/residencia_ab_2.webp',
            'imgs/residencias/ab/residencia_ab_3.webp',
            'imgs/residencias/ab/residencia_ab_4.webp',
            'imgs/residencias/ab/residencia_ab_5.webp',
            'imgs/residencias/ab/residencia_ab_7.webp',
            'imgs/residencias/ab/residencia_ab_8.webp',
        ]
    },
    'torre-comercial-centro': {
        title: 'Casa SEN',
        photos: 8,
        coverImage: 'imgs/residencias/sen/residencia_sen_4.webp',
        images: [
            'imgs/residencias/sen/residencia_sen_1.webp',
            'imgs/residencias/sen/residencia_sen_2.webp',
            'imgs/residencias/sen/residencia_sen_3.webp',
            'imgs/residencias/sen/residencia_sen_4.webp',
            'imgs/residencias/sen/residencia_sen_5.webp',
            'imgs/residencias/sen/residencia_sen_6.webp',
            'imgs/residencias/sen/residencia_sen_7.webp',
            'imgs/residencias/sen/residencia_sen_8.webp',
        ]
    },
    'complejo-industrial-norte': {
        title: 'Casa contenedor',
        photos: 7,
        coverImage: 'imgs/residencias/cont/residencia_cont_1.webp',
        images: [
            'imgs/residencias/cont/residencia_cont_1.webp',
            'imgs/residencias/cont/residencia_cont_2.webp',
            'imgs/residencias/cont/residencia_cont_3.webp',
            'imgs/residencias/cont/residencia_cont_4.webp',
            'imgs/residencias/cont/residencia_cont_5.webp',
            'imgs/residencias/cont/residencia_cont_6.webp',
            'imgs/residencias/cont/residencia_cont_7.webp'
        ]
    },
    'loft': {
        title: 'Loft industrial',
        photos: 12,
        coverImage: 'imgs/residencias/loft/residencia_loft_1.webp',
        images: [
            'imgs/residencias/loft/residencia_loft_1.webp',
            'imgs/residencias/loft/residencia_loft_2.webp',
            'imgs/residencias/loft/residencia_loft_3.webp',
            'imgs/residencias/loft/residencia_loft_4.webp',
            'imgs/residencias/loft/residencia_loft_5.webp',
            'imgs/residencias/loft/residencia_loft_6.webp',
            'imgs/residencias/loft/residencia_loft_7.webp',
            'imgs/residencias/loft/residencia_loft_8.webp',
            'imgs/residencias/loft/residencia_loft_9.webp',
            'imgs/residencias/loft/residencia_loft_10.webp',
            'imgs/residencias/loft/residencia_loft_11.webp',
            'imgs/residencias/loft/residencia_loft_12.webp'
        ]
    }
};

let currentAlbum = '';
let currentImageIndex = 0;
let startX = 0;
let startY = 0;

function loadAlbums() {
    const grid = document.getElementById('albumsGrid');

    Object.keys(albumsData).forEach(albumKey => {
        const album = albumsData[albumKey];

        const albumCard = document.createElement('div');
        albumCard.className = 'album-card';
        albumCard.onclick = () => openGallery(albumKey);
        albumCard.innerHTML = `
                    <div class="album-image" style="background-image: url('${album.coverImage}')">
                        <div class="album-overlay">
                        </div>
                    </div>
                    <div class="album-content">
                        <div class="album-info">
                            <h3>${album.title}</h3>
                        </div>
                        <button class="button-glass">Ver Galería</button>
                    </div>
                `;

        grid.appendChild(albumCard);
    });
}

function openGallery(albumKey) {
    currentAlbum = albumKey;
    currentImageIndex = 0;

    const album = albumsData[albumKey];
    document.getElementById('galleryTitle').textContent = album.title;

    document.querySelector('.main-content').style.display = 'none';
    document.getElementById('galleryView').style.display = 'block';
    document.body.classList.add('gallery-open');

    loadThumbnails();
    showMainImage();
}

function loadThumbnails() {
    const sidebar = document.getElementById('thumbnailsSidebar');
    const album = albumsData[currentAlbum];

    sidebar.innerHTML = '';

    album.images.forEach((imageSrc, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail-item';
        thumbnail.style.backgroundImage = `url('${imageSrc}')`;
        thumbnail.onclick = () => selectImage(index);

        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        }

        sidebar.appendChild(thumbnail);
    });
}

function selectImage(index) {
    currentImageIndex = index;
    showMainImage();
    updateActiveThumbnail();
}

function showMainImage() {
    const album = albumsData[currentAlbum];
    const mainImage = document.getElementById('mainImage');
    mainImage.src = album.images[currentImageIndex];
}

function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function nextImage() {
    const album = albumsData[currentAlbum];
    currentImageIndex = (currentImageIndex + 1) % album.images.length;
    showMainImage();
    updateActiveThumbnail();
}

function prevImage() {
    const album = albumsData[currentAlbum];
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : album.images.length - 1;
    showMainImage();
    updateActiveThumbnail();
}

function closeGallery() {
    document.getElementById('galleryView').style.display = 'none';
    document.querySelector('.main-content').style.display = 'block';
    document.body.classList.remove('gallery-open');
}

document.addEventListener('keydown', function (e) {
    if (document.getElementById('galleryView').style.display === 'block') {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeGallery();
    }
});

const mainImageArea = document.querySelector('.main-image-area');

mainImageArea.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

mainImageArea.addEventListener('touchmove', function (e) {
    e.preventDefault();
});

mainImageArea.addEventListener('touchend', function (e) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            prevImage();
        } else {
            nextImage();
        }
    }
});

const thumbnailsSidebar = document.getElementById('thumbnailsSidebar');
let isScrolling = false;

thumbnailsSidebar.addEventListener('touchstart', function (e) {
    isScrolling = false;
});

thumbnailsSidebar.addEventListener('touchmove', function (e) {
    isScrolling = true;
});

thumbnailsSidebar.addEventListener('touchend', function (e) {
    if (!isScrolling) {
        const target = e.target.closest('.thumbnail-item');
        if (target) {
            const index = Array.from(thumbnailsSidebar.children).indexOf(target);
            selectImage(index);
        }
    }
});

document.addEventListener('DOMContentLoaded', loadAlbums);