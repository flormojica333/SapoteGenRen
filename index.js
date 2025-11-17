// --- Photo Slideshow ---
const slideImages = [
    { src: "https://placehold.co/800x600/1e3a3a/f0fdf4?text=Kitchen+Remodel", alt: "Modern kitchen remodel" },
    { src: "https://placehold.co/800x600/84cc16/1e3a3a?text=Bathroom+Upgrade", alt: "Bathroom upgrade" },
    { src: "https://placehold.co/800x600/1e3a3a/f0fdf4?text=Deck+Build", alt: "Custom deck build" },
    { src: "https://placehold.co/800x600/84cc16/1e3a3a?text=Exterior+Siding", alt: "New exterior siding" },
    { src: "https://placehold.co/800x600/1e3a3a/f0fdf4?text=Basement+Finish", alt: "Finished basement" }
];

// --- Core Application Logic ---
document.addEventListener('DOMContentLoaded', () => {

    // --- SLIDESHOW INITIALIZATION ---
    const slideshowImage = document.getElementById('slideshow-image');
    const prevSlideButton = document.getElementById('prev-slide');
    const nextSlideButton = document.getElementById('next-slide');
    const thumbnailContainer = document.getElementById('thumbnail-container');

    let currentSlideIndex = 0;

    // Function to display a specific slide
    function showSlide(index) {
        // Update the main image
        slideshowImage.src = slideImages[index].src;
        slideshowImage.alt = slideImages[index].alt;

        // Update active thumbnail
        document.querySelectorAll('#thumbnail-container img').forEach((img, i) => {
            if (i === index) {
                img.classList.add('border-sapote-accent');
                img.classList.remove('border-transparent');
            } else {
                img.classList.remove('border-sapote-accent');
                img.classList.add('border-transparent');
            }
        });

        // Scroll the active thumbnail into view
        const activeThumb = document.getElementById(`thumb-${index}`);
        if (activeThumb) {
            activeThumb.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Function to show the next slide
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slideImages.length;
        showSlide(currentSlideIndex);
    }

    // Function to show the previous slide
    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slideImages.length) % slideImages.length;
        showSlide(currentSlideIndex);
    }

    // Function to create thumbnails
    function createThumbnails() {
        if (!thumbnailContainer) return;
        thumbnailContainer.innerHTML = ''; // Clear existing thumbnails

        slideImages.forEach((image, index) => {
            const thumb = document.createElement('img');
            thumb.id = `thumb-${index}`;
            thumb.src = image.src;
            thumb.alt = `Thumbnail ${index + 1}`;
            thumb.className = "w-24 h-16 object-cover rounded-md cursor-pointer border-4 border-transparent hover:border-sapote-accent/50 transition duration-150";

            thumb.addEventListener('click', () => {
                currentSlideIndex = index;
                showSlide(index);
            });

            thumbnailContainer.appendChild(thumb);
        });
    }

    // Initialize slideshow
    if (slideshowImage) {
        createThumbnails();
        showSlide(currentSlideIndex);

        // Add event listeners for next/prev buttons
        prevSlideButton.addEventListener('click', prevSlide);
        nextSlideButton.addEventListener('click', nextSlide);
    }

    // --- (End of new slideshow logic) ---


    // --- (All existing JS logic below this line remains the same) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTopButton = document.getElementById('back-to-top');

    // --- Mobile Menu Toggle ---
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Back to Top Button Logic ---
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('invisible', 'opacity-0');
                backToTopButton.classList.add('visible', 'opacity-100');
            } else {
                backToTopButton.classList.remove('visible', 'opacity-100');
                backToTopButton.classList.add('invisible', 'opacity-0');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});