const alfabet = [
    { huruf: 'A', gambar: 'images/A.png', nama: 'Anjing' },
    { huruf: 'B', gambar: 'images/B.png', nama: 'Bunga' },
    { huruf: 'C', gambar: 'images/C.png', nama: 'Cacing' },
    { huruf: 'E', gambar: 'images/E.png', nama: 'Elang' },
    { huruf: 'F', gambar: 'images/F.png', nama: 'Flamingo' },
    { huruf: 'G', gambar: 'images/G.png', nama: 'Gajah' },
    { huruf: 'H', gambar: 'images/H.png', nama: 'Harimau' },
    { huruf: 'I', gambar: 'images/I.png', nama: 'Ikan' },
    { huruf: 'J', gambar: 'images/J.png', nama: 'Jambu' },
    { huruf: 'K', gambar: 'images/K.png', nama: 'Kucing' },
    { huruf: 'L', gambar: 'images/L.png', nama: 'Lalat' },
    { huruf: 'M', gambar: 'images/M.png', nama: 'Mobil' },
    { huruf: 'N', gambar: 'images/N.png', nama: 'Nanas' },
    { huruf: 'O', gambar: 'images/O.png', nama: 'Obor' },
    { huruf: 'P', gambar: 'images/P.png', nama: 'Pesawat' },
    { huruf: 'Q', gambar: 'images/Q.png', nama: 'Queen' },
    { huruf: 'R', gambar: 'images/R.png', nama: 'Rumah' },
    { huruf: 'S', gambar: 'images/S.png', nama: 'Sepatu' },
    { huruf: 'T', gambar: 'images/T.png', nama: 'Tv' },
    { huruf: 'U', gambar: 'images/U.png', nama: 'Ular' },
    { huruf: 'V', gambar: 'images/V.png', nama: 'Vas' },
    { huruf: 'W', gambar: 'images/W.png', nama: 'Wayang' },
    { huruf: 'X', gambar: 'images/X.png', nama: 'Xilofano' },
    { huruf: 'Y', gambar: 'images/Y.png', nama: 'Yo-Yo' },
    { huruf: 'Z', gambar: 'images/Z.png', nama: 'Zebra' }
    // Tambahkan alfabet lainnya di sini
];

let indexHuruf = 0; // Mulai dari huruf A (index 0)
let menggambar = false;
let telahMenggambar = false; // Tambahkan status apakah sudah menggambar
let garisYangDigambar = []; // Menyimpan titik yang digambar oleh pengguna

// Fungsi untuk berpindah ke halaman latihan
function mulaiLatihan() {
    document.getElementById("halamanUtama").style.display = "none";
    document.getElementById("halamanLatihan").style.display = "block";
    tampilkanHuruf();
}

// Fungsi untuk menampilkan huruf, gambar, dan panduan
function tampilkanHuruf() {
    const dataHuruf = alfabet[indexHuruf];
    document.getElementById("judulHuruf").textContent = `Gambar huruf '${dataHuruf.huruf}'`;
    document.getElementById("gambarAlfabet").src = dataHuruf.gambar;
    document.getElementById("namaAlfabet").textContent = dataHuruf.nama;

    // Reset status menggambar
    telahMenggambar = false;
    garisYangDigambar = []; // Reset garis yang digambar

    // Tampilkan gambar panduan di kanvas
    tampilkanPanduan(dataHuruf.huruf);
}

// Fungsi untuk berpindah ke pola berikutnya
function polaBerikutnya() {
    if (!telahMenggambar) {
        alert("Anda harus menggambar huruf ini terlebih dahulu sebelum melanjutkan ke huruf berikutnya!");
        return;
    }
}

// Fungsi untuk menghapus kanvas
function hapusKanvas() {
    const kanvas = document.getElementById("kanvasMenggambar");
    const konteks = kanvas.getContext("2d");
    konteks.clearRect(0, 0, kanvas.width, kanvas.height);

    // Tampilkan kembali panduan
    tampilkanPanduan(alfabet[indexHuruf].huruf);
}

// Fungsi untuk menggambar di kanvas
const kanvas = document.getElementById("kanvasMenggambar");
const konteks = kanvas.getContext("2d");

kanvas.addEventListener("mousedown", () => {
    menggambar = true;
});
kanvas.addEventListener("mouseup", () => menggambar = false);
kanvas.addEventListener("mousemove", menggambarDiKanvas);

function menggambarDiKanvas(event) {
    if (!menggambar) return;
    const rect = kanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    konteks.fillStyle = "black";
    konteks.beginPath();
    konteks.arc(x, y, 2, 0, Math.PI * 2);
    konteks.fill();

    // Simpan titik yang digambar
    garisYangDigambar.push({ x, y });

    // Tandai bahwa pengguna telah menggambar
    telahMenggambar = true;
}

// Fungsi untuk menampilkan panduan di kanvas
function tampilkanPanduan(huruf) {
    const gambarPanduan = new Image();
    gambarPanduan.src = `images/${huruf} pan.png`;

    gambarPanduan.onload = () => {
        const kanvas = document.getElementById("kanvasMenggambar");
        const konteks = kanvas.getContext("2d");

        // Bersihkan kanvas sebelum menambahkan gambar panduan
        konteks.clearRect(0, 0, kanvas.width, kanvas.height);

        // Gambar panduan di kanvas
        konteks.globalAlpha = 0.3; // Transparansi gambar panduan
        konteks.drawImage(gambarPanduan, 0, 0, kanvas.width, kanvas.height);
        konteks.globalAlpha = 1.0; // Kembalikan transparansi ke normal
    };

    gambarPanduan.onerror = () => {
        console.error(`Gambar panduan ${huruf} gagal dimuat.`);
    };
}

// Fungsi untuk mengecek kesalahan gambar
function cekKesalahan() {
    const kanvas = document.getElementById("kanvasMenggambar");
    const context = kanvas.getContext("2d");

    // Ambil gambar yang digambar oleh pengguna
    const imageDataUser = context.getImageData(0, 0, kanvas.width, kanvas.height);
    const imageDataPanduan = getImageDataFromPanduan(); // Fungsi ini akan mengambil gambar dari panduan yang digunakan

    // Bandingkan data gambar yang digambar dengan data gambar panduan
    return isSamePattern(imageDataUser, imageDataPanduan);
}

// Fungsi untuk mendapatkan data gambar panduan
function getImageDataFromPanduan() {
    const kanvas = document.createElement("canvas");
    const konteks = kanvas.getContext("2d");
    const gambarPanduan = new Image();
    gambarPanduan.src = `images/${alfabet[indexHuruf].huruf} pan.png`; // Menggunakan gambar panduan

    kanvas.width = 300; // Sesuaikan ukuran sesuai kebutuhan
    kanvas.height = 300;

    gambarPanduan.onload = () => {
        konteks.drawImage(gambarPanduan, 0, 0, kanvas.width, kanvas.height);
    };

    return konteks.getImageData(0, 0, kanvas.width, kanvas.height);
}

// Fungsi untuk membandingkan dua pola gambar (pengguna dan panduan)
function isSamePattern(imageDataUser, imageDataPanduan) {
    const threshold = 50; // Toleransi perbedaan (0-255)
    const width = imageDataUser.width;
    const height = imageDataUser.height;

    let matchCount = 0; // Jumlah piksel yang cocok
    let totalPixels = width * height; // Total piksel yang dibandingkan

    for (let i = 0; i < imageDataUser.data.length; i += 4) {
        const rUser = imageDataUser.data[i];
        const gUser = imageDataUser.data[i + 1];
        const bUser = imageDataUser.data[i + 2];
        const aUser = imageDataUser.data[i + 3];

        const rPanduan = imageDataPanduan.data[i];
        const gPanduan = imageDataPanduan.data[i + 1];
        const bPanduan = imageDataPanduan.data[i + 2];
        const aPanduan = imageDataPanduan.data[i + 3];

        // Hitung perbedaan warna (Euclidean distance)
        const diff = Math.sqrt(
            Math.pow(rUser - rPanduan, 2) +
            Math.pow(gUser - gPanduan, 2) +
            Math.pow(bUser - bPanduan, 2)
        );

        if (diff <= threshold && aUser > 0 && aPanduan > 0) {
            matchCount++;
        }
    }

    // Jika persentase kecocokan cukup tinggi, anggap benar
    const matchPercentage = (matchCount / totalPixels) * 100;
    return matchPercentage > 30; // 30% piksel cocok dianggap benar
}
