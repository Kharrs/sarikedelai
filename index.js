/* =================================================================
   index.js - Logika Partikel Konstelasi & Efek Transisi Sinematik
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    let particles = []; 
    let isExiting = false;

    // =================================================================
    // A. ANIMASI PARTIKEL KONSTELASI & INTERAKSI MOUSE / SENTUH
    // =================================================================
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const particleCount = 100; // Jumlah partikel lebih padat dan hidup

        let mouse = {
            x: null,
            y: null,
            radius: 160 // Jangkauan jaring interaktif kursor
        };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Pelacakan kursor PC/Laptop
        window.addEventListener('mousemove', (e) => {
            if (isExiting) return; 
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Pelacakan sentuhan jari Smartphone (Android / iOS)
        window.addEventListener('touchmove', (e) => {
            if (isExiting) return;
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        });

        window.addEventListener('touchend', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 1; 
                this.speedX = Math.random() * 0.8 - 0.4; 
                this.speedY = Math.random() * 0.8 - 0.4; 
                this.alpha = Math.random() * 0.5 + 0.4; 
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Pantulan dinding layar
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = '#738a75'; 
                ctx.shadowBlur = 12; 
                ctx.shadowColor = 'rgba(115, 138, 117, 0.6)'; 
                ctx.fill();
                ctx.restore();
            }
        }

        function initParticles() {
            particles = []; 
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Jaring konstelasi otomatis antar partikel
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(115, 138, 117, ${0.3 - (distance / 120) * 0.3})`;
                        ctx.lineWidth = 0.9;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Jaring laser interaktif ke kursor atau sentuhan jari
                if (mouse.x != null && mouse.y != null) {
                    const mDx = particles[i].x - mouse.x;
                    const mDy = particles[i].y - mouse.y;
                    const mDistance = Math.sqrt(mDx * mDx + mDy * mDy);

                    if (mDistance < mouse.radius) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(115, 138, 117, ${0.6 - (mDistance / mouse.radius) * 0.6})`;
                        ctx.lineWidth = 1.3;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // =================================================================
    // B. EFEK MESIN KETIK (TYPEWRITER ANIMATION EFFECT)
    // =================================================================
    const typewriterElement = document.getElementById("typewriter");
    const textToType = "Selamat datang di kebaikan murni susu kedelai. Nikmati olahan susu kedelai murni buatan rumah yang dibuat penuh kehangatan.";
    
    if (typewriterElement) {
        let charIndex = 0;
        function typeEffect() {
            if (charIndex < textToType.length) {
                typewriterElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 35);
            }
        }
        setTimeout(typeEffect, 500);
    }

    // =================================================================
    // C. EFEK MAGNETIK & TRANSISI SINEMATIK KELUAR HALAMAN
    // =================================================================
    const magneticArea = document.getElementById("magneticArea");
    const portalBtn = document.getElementById("portalBtn");
    const mainCard = document.getElementById("mainCard");

    if (magneticArea && portalBtn) {
        
        // Efek Tarik Magnetik pada Kontainer Tombol
        magneticArea.addEventListener("mousemove", (e) => {
            if (isExiting) return;
            const rect = magneticArea.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            magneticArea.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        magneticArea.addEventListener("mouseleave", () => {
            if (isExiting) return;
            magneticArea.style.transform = "translate(0px, 0px)";
        });

        // Aksi Utama Saat Tombol Ditekan (Urutan Jeda & Efek Spektakuler)
        portalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetUrl = portalBtn.getAttribute("href");

            if (isExiting) return;
            isExiting = true;

            // 1. Kunci posisi elemen & matikan klik ganda[span_1](start_span)[span_1](end_span)
            magneticArea.style.transform = "translate(0px, 0px)";
            portalBtn.style.pointerEvents = 'none';
            portalBtn.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            portalBtn.style.transform = 'scale(1.05)'; // Efek membesar elegan saat ditekan

            const btnText = portalBtn.querySelector('span');
            if (btnText) {
                btnText.innerHTML = 'Memvalidasi Akses...';
            }

            // 2. TAHAP 1: Picu partikel menjadi super cepat (Warp Speed Effect)[span_2](start_span)[span_2](end_span)
            if (particles && particles.length > 0) {
                particles.forEach(p => {
                    p.speedX *= 30; // Kecepatan ekstrem
                    p.speedY *= 30;
                    p.size = Math.random() * 3.5 + 1.5;
                });
            }

            // 3. JEDA WAKTU PERTAMA (2.2 Detik: Simulasi Proses Validasi Sistem)
            setTimeout(() => {
                if (btnText) {
                    btnText.innerHTML = 'Akses Diterima ✔️';
                }
                
                // Ubah gaya tombol menjadi hijau sukses yang bersinar terang
                portalBtn.style.background = 'linear-gradient(135deg, #4ade80, #10b981)'; 
                portalBtn.style.color = '#ffffff';
                portalBtn.style.boxShadow = '0 0 35px rgba(16, 185, 129, 0.7)';
                
                // Redam kecepatan partikel secara drastis untuk transisi kembali tenang
                particles.forEach(p => { 
                    p.speedX *= 0.08; 
                    p.speedY *= 0.08; 
                });

                // 4. JEDA WAKTU KEDUA (0.9 Detik: Menikmati status sukses sebelum kartu lenyap)
                setTimeout(() => {
                    if (mainCard) {
                        mainCard.classList.add('fade-out-exit'); // Kartu tenggelam & memudar kabur
                    }

                    // 5. JEDA WAKTU KETIGA (0.6 Detik: Penutup animasi sebelum browser pindah halaman)[span_3](start_span)[span_3](end_span)
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 600);

                }, 900);

            }, 2200);
        });
    }
});
