function openInvitation() {
    // Menambahkan kelas terbuka pada cover
    const coverPage = document.getElementById('cover-page');
    if (coverPage) {
        coverPage.classList.add('cover-opened');
    }
    
    // Mengizinkan scroll pada halaman utama
    document.body.classList.remove('no-scroll');
    
    // Trigger elemen fade-in gelombang pertama yang langsung kelihatan di atas
    setTimeout(() => {
        document.querySelectorAll('#main-invitation header.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 300);
}

// Fitur Nama Tamu otomatis dari URL
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('to');
if (guest && document.getElementById('guest-name')) { 
    document.getElementById('guest-name').innerText = guest; 
}

// COUNTDOWN TIMER (9 Juni 2026, 11:00 AM)
const targetDate = new Date("June 9, 2026 11:00:00").getTime();

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    // Jika waktu sudah lewat/habis
    if (diff < 0) {
        clearInterval(countdownInterval);
        if(document.getElementById('days')) {
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('mins').innerText = "00";
            document.getElementById('secs').innerText = "00";
        }
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    // Menampilkan ke HTML dengan format 2 digit (pake String.padStart)
    if (document.getElementById('days')) {
        document.getElementById('days').innerText = String(d).padStart(2, '0');
        document.getElementById('hours').innerText = String(h).padStart(2, '0');
        document.getElementById('mins').innerText = String(m).padStart(2, '0');
        document.getElementById('secs').innerText = String(s).padStart(2, '0');
    }
}, 1000);

function openInvitation() {
            // 1. Ambil ID elemen cover dan audio
            const cover = document.getElementById('cover-page');
            const audio = document.getElementById('invitation-audio');
            
            // 2. Mainkan musik otomatis (Aman dari kebijakan autoplay block browser)
            if (audio) {
                audio.play().catch(function(error) {
                    console.log("Autoplay dicegah oleh browser, musik butuh interaksi pengguna: ", error);
                });
            }
            
            // 3. Efek transisi membuka cover (geser ke atas)
            cover.classList.add('cover-opened');
            
            // 4. Mengembalikan scrollbar halaman utama
            document.body.classList.remove('no-scroll');
        }

// Scroll Animation menggunakan Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { 
    threshold: 0.15, // Ditinggikan sedikit agar animasi muncul pas elemen bener-bener masuk layar
    rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ==========================================
// 1. FUNGSI AMBIL NAMA TAMU DARI LINK URL
// ==========================================
function dapatkanNamaTamu() {
    // Membaca parameter yang ada di URL (contoh: ?to=Nama+Tamu)
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to');

    // Jika di URL ada nama tamu (?to=...), ubah teks di id="guest-name"
    if (namaTamu) {
        // Menghapus spasi berlebih atau karakter aneh yang tidak sengaja terinput
        document.getElementById('guest-name').innerText = namaTamu.trim();
        
        // Opsional: Otomatis mengisi kolom "Nama Anda" di form ucapan biar tamu tidak repot mengetik ulang
        const inputNamaForm = document.getElementById('input-nama');
        if (inputNamaForm) {
            inputNamaForm.value = namaTamu.trim();
        }
    }
}

// Jalankan fungsi ambil nama segera setelah halaman dimuat
window.addEventListener('DOMContentLoaded', dapatkanNamaTamu);