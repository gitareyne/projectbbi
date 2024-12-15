document.addEventListener('DOMContentLoaded', () => {
    const userProfile = document.querySelector('.user-profile');
    const profileSection = document.getElementById('profileSection');
    const daftarSiswaLink = document.getElementById('daftarSiswaLink');
    const siswaSection = document.getElementById('siswaSection');
    const siswaContainer = document.getElementById('siswaContainer');
    const berandaLink = document.getElementById('berandaLink');
    const branchLinks = document.querySelectorAll('.branch-link');
    const berandaSection = document.getElementById('berandaSection');
    const branchSection = document.getElementById('branchSection');
    const branchTitle = document.getElementById('branchTitle');
     const branchAddress = document.getElementById('branchAddress');
    const branchPieChartElement = document.getElementById('branchPieChart');
    let pieChart;

    const siswaData = [
        { jumlah: 245, nama: "AKPOL" },
        { jumlah: 120, nama: "BINTARA TNI" },
        { jumlah: 80, nama: "BINTARA POLRI" },
        { jumlah: 80, nama: "STAN" },
        { jumlah: 67, nama: "SEKDIN" },
        { jumlah: 337, nama: "UNHAN" },
        { jumlah: 92, nama: "AKA TNI" },
        { jumlah: 74, nama: "SNBT" }
    ];

    const sections = document.querySelectorAll('section');

    // Fungsi untuk menyembunyikan semua section
    function hideAllSections() {
        sections.forEach(section => section.classList.add('hidden'));
    }

    // Fungsi untuk render ulang Pie Chart
    function renderPieChart() {
        // Hancurkan chart jika sudah ada
        if (pieChart) {
            pieChart.destroy();
        }

        // Buat chart baru
        pieChart = new Chart(branchPieChartElement.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Sekolah Ikatan Kedinasan', 'UNHAN', 'Akademi Kepolisian', 'Akademi TNI', 'Bintara TNI & POLRI', 'Kedokteran/SNBT'],
                datasets: [{
                    data: [10, 310, 130, 60, 765, 89],
                    backgroundColor: ['#1A5319', '#80AF81', '#508D4E', '#1A5319', '#9CDBA6', '#DEF9C4']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Event listener untuk menu "Beranda"
    berandaLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        berandaSection.classList.remove('hidden');
    });

    // Event listener untuk submenu "Cabang"
    branchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const branchName = link.getAttribute('data-branch');
            hideAllSections();
            branchSection.classList.remove('hidden');
            branchTitle.textContent = `Data Cabang: ${branchName}`;
            renderPieChart(); // Render ulang pie chart
        });
    });

    // Event listener untuk menu "Siswa"
    daftarSiswaLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        siswaSection.classList.remove('hidden');

        // Clear existing content
        siswaContainer.innerHTML = '';

        // Populate siswa cards
        siswaData.forEach((siswa) => {
            const card = document.createElement('div');
            card.classList.add('siswa-card');
            card.innerHTML = `<h2>${siswa.jumlah} SISWA</h2><p>${siswa.nama}</p>`;
            siswaContainer.appendChild(card);
        });
    });

    // Event listener untuk menu "Profil Admin"
    userProfile.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        profileSection.classList.remove('hidden');
    });
});
