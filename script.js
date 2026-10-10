document.addEventListener("DOMContentLoaded", () => {
    
    // Mengambil semua elemen yang memiliki class 'fade-in-scroll'
    const elemenScroll = document.querySelectorAll('.fade-in-scroll');

    // Pengaturan pendeteksi layar
    const opsiPendeteksi = {
        root: null,         // Menggunakan layar utama browser sebagai acuan
        threshold: 0.15,    // Animasi aktif jika 15% bagian elemen sudah masuk ke layar
        rootMargin: "0px"   
    };

    // Fungsi pemicu saat elemen masuk ke dalam pandangan layar
    const pengawasLayar = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Jika elemen sudah tergeser masuk dan terlihat di layar
            if (entry.isIntersecting) {
                // Tambahkan class 'muncul' untuk memicu animasi CSS pudar masuk
                entry.target.classList.add('muncul');
                // Hentikan pengawasan pada elemen ini agar animasi tidak berulang-ulang
                observer.unobserve(entry.target);
            }
        });
    }, opsiPendeteksi);

    // Daftarkan semua elemen target ke dalam sistem pengawasan layar
    elemenScroll.forEach(elemen => {
        pengawasLayar.observe(elemen);
    });

});
