const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

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

const albumsData = {
    'residencial-los-pinos': {
        title: 'Residencial Los Pinos',
        description: 'Complejo residencial de lujo con 45 viviendas, áreas verdes y amenidades exclusivas. Diseño moderno con acabados de primera calidad.',
        location: 'Zona Norte',
        year: '2024',
        photos: 15,
        coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607688960-e095c075303a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607688020-c080f6e55fcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
    },
    'torre-comercial-centro': {
        title: 'Torre Comercial Centro',
        description: 'Moderno edificio comercial de 20 pisos con oficinas ejecutivas y locales comerciales en planta baja. Ubicación estratégica en el centro de la ciudad.',
        location: 'Centro',
        year: '2023',
        photos: 12,
        coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
    },
    'complejo-industrial-norte': {
        title: 'Complejo Industrial Norte',
        description: 'Desarrollo industrial con naves especializadas para manufactura y logística. Infraestructura de primer nivel con tecnología de punta.',
        location: 'Zona Industrial',
        year: '2024',
        photos: 18,
        coverImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1565630278560-e6e79b44e4bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
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
                            <p>${album.description}</p>
                            <div class="album-meta">
                                <div class="meta-item"><i class="bi bi-geo-alt-fill"></i> ${album.location}</div>
                                <div class="meta-item"><i class="bi bi-calendar-fill"></i> ${album.year}</div>
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