/* =================================================================
   js/halaman.js - Logika Efek Scroll, Back to Top, Modal, & Carousel
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Logika Scroll Fade-In (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // 2. Logika Tombol Kembali ke Atas (Back to Top)
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Logika Pop-Up Modal (Fakta Menarik & Varian Produk)
    const factButtons = document.querySelectorAll('.btn-fact');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    // Buka Modal saat tombol diklik
    factButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
            }
        });
    });

    // Fungsi untuk menutup semua modal
    const closeModal = () => {
        modalOverlays.forEach(modal => modal.classList.remove('active'));
    };

    // Tutup saat tombol 'X' diklik
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    // Tutup saat area luar modal (overlay) diklik
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    });

    // Tutup saat menekan tombol Escape di keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // 4. Logika Carousel Varian Produk di dalam Modal
    const modalProduk = document.getElementById("modal-produk");
    if (modalProduk) {
        const slides = modalProduk.querySelectorAll(".carousel-slide");
        const dots = modalProduk.querySelectorAll(".dot");
        const prevBtn = modalProduk.querySelector(".prev-btn");
        const nextBtn = modalProduk.querySelector(".next-btn");
        let currentIndex = 0;

        function showSlide(index) {
            if (index >= slides.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = slides.length - 1;
            } else {
                currentIndex = index;
            }

            slides.forEach((slide, i) => {
                slide.classList.remove("active");
                if (dots[i]) dots[i].classList.remove("active");
                
                if (i === currentIndex) {
                    slide.classList.add("active");
                    if (dots[i]) dots[i].classList.add("active");
                }
            });
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener("click", () => {
                showSlide(currentIndex + 1);
            });

            prevBtn.addEventListener("click", () => {
                showSlide(currentIndex - 1);
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                showSlide(i);
            });
        });
    }

});
