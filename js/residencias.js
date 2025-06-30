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

function loadAlbums() {
    const grid = document.getElementById('albumsGrid');

    Object.keys(albumsData).forEach(albumKey => {
        const album = albumsData[albumKey];

        const albumCard = document.createElement('div');
        albumCard.className = 'album-card';
        albumCard.innerHTML = `
                    <div class="album-image" style="background-image: url('${album.coverImage}')"></div>
                    <div class="album-content">
                        <div class="album-info">
                            <h3>${album.title}</h3>
                            <div class="album-meta">
                                <div class="meta-item"><i class="bi bi-camera-fill"></i> ${album.photos} fotos</div>
                            </div>
                        </div>
                        <button class="button-glass" onclick="openAlbum('${albumKey}')">Ver Galería</button>
                    </div>
                `;

        grid.appendChild(albumCard);
    });
}

function openAlbum(albumKey) {
    currentAlbum = albumKey;
    currentImageIndex = 0;

    const album = albumsData[albumKey];
    document.getElementById('modalTitle').textContent = album.title;
    document.getElementById('galleryModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    showCurrentImage();
}

function showCurrentImage() {
    const album = albumsData[currentAlbum];
    const image = document.getElementById('galleryImage');
    const counter = document.getElementById('galleryCounter');

    image.src = album.images[currentImageIndex];
    counter.textContent = `${currentImageIndex + 1} / ${album.images.length}`;
}

function prevImage() {
    const album = albumsData[currentAlbum];
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : album.images.length - 1;
    showCurrentImage();
}

function nextImage() {
    const album = albumsData[currentAlbum];
    currentImageIndex = currentImageIndex < album.images.length - 1 ? currentImageIndex + 1 : 0;
    showCurrentImage();
}

function closeModal() {
    document.getElementById('galleryModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', function (e) {
    if (document.getElementById('galleryModal').style.display === 'block') {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeModal();
    }
});

document.getElementById('galleryModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', loadAlbums);