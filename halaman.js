/* =================================================================
   js/halaman.js - Logika Efek Scroll Fade-In & Tombol Kembali ke Atas
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

});
    // 3. Logika Pop-Up Modal (Fakta Menarik)
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
