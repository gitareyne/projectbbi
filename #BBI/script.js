document.addEventListener('DOMContentLoaded', () => {
    const berandaLink = document.getElementById('berandaLink');
    const branchLinks = document.querySelectorAll('.branch-link');
    const berandaSection = document.getElementById('berandaSection');
    const branchSection = document.getElementById('branchSection');
    const branchTitle = document.getElementById('branchTitle');
    const branchPieChartElement = document.getElementById('branchPieChart');
    const chartContainer = document.querySelector('.chart-container');
    const dataTable = document.getElementById('dataTable');
    const searchInput = document.getElementById("searchInput");
    let pieChart;

    // Fungsi untuk menampilkan/menyembunyikan bagian cabang dan tabel/pie chart
    function toggleBranchSection() {
        chartContainer.style.display = chartContainer.style.display === 'none' ? 'block' : 'none';
        dataTable.style.display = dataTable.style.display === 'none' ? 'block' : 'none';
    }

    // Event listener untuk beranda
    berandaLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Kembali ke beranda: sembunyikan cabang, tabel, dan chart
        berandaSection.classList.remove('hidden');
        branchSection.classList.add('hidden');
        chartContainer.style.display = 'none';  // Sembunyikan chart
        dataTable.style.display = 'none';       // Sembunyikan tabel
    });

    // Event listener untuk link cabang
    branchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const branchName = link.getAttribute('data-branch');
            berandaSection.classList.add('hidden');
            branchSection.classList.remove('hidden');
            branchTitle.textContent = `Cabang: ${branchName}`;

            // Hapus chart sebelumnya jika ada
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

            // Tampilkan tabel dan pie chart
            chartContainer.style.display = 'block';
            dataTable.style.display = 'block';
        });
    });

    // Fungsi untuk mencari nama di tabel
    function searchTable() {
        const input = searchInput.value.toLowerCase();
        const table = document.getElementById("dataTable");
        const rows = table.getElementsByTagName("tr");

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName("td");
            let match = false;

            for (let j = 0; j < cells.length; j++) {
                const cellValue = cells[j].innerText.toLowerCase();
                if (cellValue.includes(input)) {
                    match = true;
                    break;
                }
            }

            rows[i].style.display = match ? "" : "none";
        }
    }

    // Event listener untuk search bar
    if (searchInput) {
        searchInput.addEventListener('keyup', searchTable);
    }

    // Sembunyikan tabel dan pie chart pada saat pertama kali
    chartContainer.style.display = 'none';
    dataTable.style.display = 'none';

    // Mengatur tampilan awal pada beranda
    const searchBarContainer = document.querySelector('.search-bar-container'); // Container untuk search bar
    searchBarContainer.classList.add('hidden');  // Sembunyikan di beranda

    // Event listener untuk kembali ke Beranda
    const backToBerandaLink = document.getElementById("backToBerandaLink");
    if (backToBerandaLink) {
        backToBerandaLink.addEventListener('click', (e) => {
            e.preventDefault();
            berandaSection.classList.remove('hidden');
            branchSection.classList.add('hidden');
            chartContainer.style.display = 'none';  // Sembunyikan chart
            dataTable.style.display = 'none';       // Sembunyikan tabel
        });
    }
});
