document.addEventListener("DOMContentLoaded", () => {
    
    // Menjaring seluruh bagian halaman yang bertanda 'fade-in-scroll'
    const elemenScroll = document.querySelectorAll('.fade-in-scroll');

    function jalankanDeteksiScroll() {
        elemenScroll.forEach(elemen => {
            // Mengambil posisi komponen relatif terhadap tinggi layar
            const posisiElemenAtas = elemen.getBoundingClientRect().top;
            
            // Batas pemicu aktif (Elemen terdeteksi jika sudah naik mencapai 85% area layar)
            const batasPemicuLayar = window.innerHeight * 0.50;

            if (posisiElemenAtas < batasPemicuLayar) {
                // Memberikan lampu hijau efek CSS pudar masuk
                elemen.classList.add('muncul');
            }
        });
    }

    // Mengaktifkan pendeteksi gulir secara terus menerus saat layar digeser
    window.addEventListener('scroll', jalankanDeteksiScroll);
    
    // Jalankan satu kali di awal untuk memeriksa bagian atas halaman
    jalankanDeteksiScroll();
});
