declare var AOS: any;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true, // whether animation should happen only once - while scrolling down
    });

    // Preloader Logic
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Sticky Navbar Logic
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (navbar) {
        const scrollThreshold = 50; // Pixels to scroll before navbar becomes sticky
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Hero Slideshow & Headline Animation Logic
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    const headline = document.getElementById('hero-headline');
    const headlines = [
        "For every occasion of Life",
        "Celebrate Your Moments With Us",
        "Elegance in Every Detail",
        "Your Perfect Venue Awaits"
    ];
    let currentSlide = 0;

    function showNextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');

        if (headline) {
            headline.style.animation = 'none'; // Reset animation
            headline.offsetHeight; // Trigger reflow
            headline.style.animation = ''; // Re-apply animation
            headline.textContent = headlines[currentSlide];
        }
    }

    if (slides.length > 0) {
        setInterval(showNextSlide, 5000); // Change slide every 5 seconds
    }

    // Mobile Navigation
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileNavLinks = mobileNavOverlay?.querySelectorAll('a');

    const toggleMenu = () => {
        mobileNavOverlay?.classList.toggle('active');
    };
    
    hamburgerMenu?.addEventListener('click', toggleMenu);
    closeMenuBtn?.addEventListener('click', toggleMenu);
    mobileNavLinks?.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Smooth Scrolling for Nav Links
    const navLinks = document.querySelectorAll('.navbar a[href^="#"], .mobile-nav a[href^="#"], .footer-column.links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(this: HTMLAnchorElement, e: MouseEvent) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Room Modal Logic
    const roomDetailsData = {
        maharaja: {
            title: "The Maharaja Suite",
            price: "Starting from $799/night",
            description: "Step into a world of regal splendor in the Maharaja Suite, our most prestigious accommodation. This expansive suite offers breathtaking panoramic views from a private, wrap-around balcony. Inside, a grand four-poster king bed takes center stage, complemented by exquisite, hand-carved furniture and rich silk tapestries. The opulent marble bathroom features a deep Jacuzzi bathtub, a separate rainfall shower, and premium Ayurvedic toiletries. With a dedicated living area, a formal dining space for six, and the attentive service of a personal butler, every moment is crafted for an unforgettable royal experience.",
            amenities: ["Private Balcony", "Ocean View", "Jacuzzi Bathtub", "Personal Butler Service", "Walk-in Closet", "Living & Dining Area", "King Four-Poster Bed", "Premium Minibar"],
            images: [
                'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
                'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
                'https://images.unsplash.com/photo-1595526114035-0d45ed16433d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
                'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800'
            ]
        },
        villa: {
            title: "Lakeview Pool Villa",
            price: "Starting from $599/night",
            description: "Find your personal haven of tranquility in our secluded Lakeview Pool Villa. Designed for ultimate privacy and relaxation, each villa boasts a personal plunge pool set within a lush, walled garden patio. Floor-to-ceiling windows offer serene views of the placid lake, creating a seamless connection with nature. The spacious interior features a comfortable king-sized bed, a cozy seating area, and a modern, well-appointed bathroom. Enjoy exclusive in-villa dining on your patio or take a few steps for direct access to the calm waters of the lake. It's the perfect escape for those seeking peace and seclusion.",
            amenities: ["Private Plunge Pool", "Garden Patio", "Lake Access", "In-Villa Dining", "King-Sized Bed", "Outdoor Seating", "Minibar", "Espresso Machine"],
            images: [
                'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
                'https://images.unsplash.com/photo-1617850849548-65123a8c51f4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
                'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800'
            ]
        },
        deluxe: {
            title: "Deluxe King Room",
            price: "Starting from $399/night",
            description: "Discover the perfect blend of comfort and style in our Deluxe King Room. Thoughtfully designed with a touch of local artistry, this room provides a peaceful and productive retreat. It features a plush, custom-made king-sized bed, a spacious work desk with high-speed internet access, and a comfortable armchair for relaxation. The elegant bathroom is equipped with a modern rainfall shower and deluxe bath products. With 24-hour room service and state-of-the-art amenities at your fingertips, the Deluxe King Room offers a sophisticated and restful experience for both leisure and business travelers.",
            amenities: ["King-Sized Bed", "Rainfall Shower", "Work Desk", "24-Hour Room Service", "High-Speed Wi-Fi", "4K Smart TV", "In-Room Safe", "City View"],
            images: [
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
                'https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
                'https://images.unsplash.com/photo-1594911767644-d654f515918a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
                'https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800'
            ]
        }
    };
    
    const roomModalOverlay = document.getElementById('room-modal-overlay');
    const modalImageGallery = document.getElementById('modal-image-gallery');
    const modalDetailsContainer = document.getElementById('modal-details');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const viewDetailsBtns = document.querySelectorAll('.btn-details[data-room]');
    
    let modalSlideshowInterval: number | null = null;

    const openRoomModal = (roomKey: string) => {
        const roomData = roomDetailsData[roomKey as keyof typeof roomDetailsData];
        if (!roomData || !modalImageGallery || !modalDetailsContainer || !roomModalOverlay) return;

        // Populate images
        modalImageGallery.innerHTML = roomData.images.map((src, index) => 
            `<img src="${src}" alt="${roomData.title} image ${index + 1}" class="modal-image ${index === 0 ? 'active' : ''}">`
        ).join('');

        // Populate details
        modalDetailsContainer.innerHTML = `
            <h3>${roomData.title}</h3>
            <p class="modal-price">${roomData.price}</p>
            <p>${roomData.description}</p>
            <h4>Amenities</h4>
            <ul class="modal-amenities">
                ${roomData.amenities.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <button class="btn-book-modal">Book This Room</button>
        `;
        
        roomModalOverlay.classList.add('active');
        startModalSlideshow();
    };

    const closeRoomModal = () => {
        if (!roomModalOverlay) return;
        roomModalOverlay.classList.remove('active');
        if (modalSlideshowInterval) {
            clearInterval(modalSlideshowInterval);
            modalSlideshowInterval = null;
        }
    };

    const startModalSlideshow = () => {
        if (modalSlideshowInterval) clearInterval(modalSlideshowInterval);

        modalSlideshowInterval = window.setInterval(() => {
            if (!modalImageGallery) return;
            const images = modalImageGallery.querySelectorAll('.modal-image');
            if (images.length <= 1) return;
            
            const activeImage = modalImageGallery.querySelector('.modal-image.active');
            if (!activeImage) return;

            const currentIndex = Array.from(images).indexOf(activeImage);
            const nextIndex = (currentIndex + 1) % images.length;

            activeImage.classList.remove('active');
            images[nextIndex].classList.add('active');
        }, 4000);
    };

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const roomKey = (btn as HTMLElement).dataset.room;
            if (roomKey) {
                openRoomModal(roomKey);
            }
        });
    });

    modalCloseBtn?.addEventListener('click', closeRoomModal);
    roomModalOverlay?.addEventListener('click', (e) => {
        if (e.target === roomModalOverlay) {
            closeRoomModal();
        }
    });


    // Gallery Lightbox Logic
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = lightbox?.querySelector('img') as HTMLImageElement;
    const lightboxClose = lightbox?.querySelector('.lightbox-close');
    const lightboxNext = lightbox?.querySelector('.lightbox-nav.next');
    const lightboxPrev = lightbox?.querySelector('.lightbox-nav.prev');

    if (galleryItems.length > 0 && lightbox && lightboxImg) {
        const imageSources = Array.from(galleryItems).map(item => (item as HTMLAnchorElement).href);
        let currentIndex = 0;

        const showImage = (index: number) => {
            if (index < 0 || index >= imageSources.length) return;
            lightboxImg.src = imageSources[index];
            currentIndex = index;
        };

        const openLightbox = (index: number) => {
            lightbox?.classList.add('active');
            showImage(index);
        };

        const closeLightbox = () => {
            lightbox?.classList.remove('active');
        };

        const showNextImage = () => {
            const nextIndex = (currentIndex + 1) % imageSources.length;
            showImage(nextIndex);
        };

        const showPrevImage = () => {
            const prevIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
            showImage(prevIndex);
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(index);
            });
        });

        lightboxClose?.addEventListener('click', closeLightbox);
        lightboxNext?.addEventListener('click', showNextImage);
        lightboxPrev?.addEventListener('click', showPrevImage);

        // Close on clicking the backdrop
        lightbox?.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox?.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
            }
        });
    }


    // Dynamic Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear().toString();
    }
});