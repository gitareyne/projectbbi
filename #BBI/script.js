document.addEventListener('DOMContentLoaded', () => {
    const berandaLink = document.getElementById('berandaLink');
    const branchLinks = document.querySelectorAll('.branch-link');
    const berandaSection = document.getElementById('berandaSection');
    const branchSection = document.getElementById('branchSection');
    const branchTitle = document.getElementById('branchTitle');
    const branchAddress = document.getElementById('branchAddress');
    const branchPieChartElement = document.getElementById('branchPieChart');
    const chartContainer = document.querySelector('.chart-container');
    const dataTable = document.getElementById('dataTable');
    const searchInput = document.getElementById("searchInput");
    let pieChart;

    // Fungsi untuk toggle tampilan chart dan dataTable
    function toggleBranchSection() {
        chartContainer.style.display = chartContainer.style.display === 'none' ? 'block' : 'none';
        dataTable.style.display = dataTable.style.display === 'none' ? 'block' : 'none';
    }

    // Event Listener untuk tombol Beranda
    berandaLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Menampilkan Beranda dan menyembunyikan Cabang
        berandaSection.classList.remove('hidden');
        branchSection.classList.add('hidden');
        chartContainer.style.display = 'none';
        dataTable.style.display = 'none';
    });

    branchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
    
            // Ambil data cabang dari atribut
            const branchName = link.getAttribute('data-branch');
            const branchLocation = link.getAttribute('data-address');
    
            // Set nama dan alamat cabang
            branchTitle.textContent = branchName; // Nama cabang
            branchAddress.textContent = branchLocation; // Alamat cabang
    
            // Tampilkan cabang, sembunyikan beranda
            berandaSection.classList.add('hidden');
            branchSection.classList.remove('hidden');
    
            // Sembunyikan header (logo dan admin)
            document.getElementById('mainHeader').style.display = 'none';
    
            // Hancurkan chart lama jika ada
            if (pieChart) {
                pieChart.destroy();
            }
    
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
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right', // Pindahkan legenda ke kanan
                            labels: {
                                boxWidth: 20, // Lebar kotak warna di legenda
                                padding: 10 // Jarak antara legenda dan teks
                            }
                        }
                    }
                }
            });
            
            // Tampilkan Chart dan DataTable
            chartContainer.style.display = 'block';
            dataTable.style.display = 'block';
        });
    });
    
    // Tampilkan kembali header saat kembali ke beranda
    document.getElementById('backToBerandaLink').addEventListener('click', (e) => {
        e.preventDefault();
    
        // Tampilkan beranda, sembunyikan cabang
        berandaSection.classList.remove('hidden');
        branchSection.classList.add('hidden');
    
        // Tampilkan kembali header (logo dan admin)
        document.getElementById('mainHeader').style.display = 'flex';
    
        // Sembunyikan chart dan data table
        chartContainer.style.display = 'none';
        dataTable.style.display = 'none';
    });
    
    // Fungsi pencarian dalam tabel
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

    if (searchInput) {
        searchInput.addEventListener('keyup', searchTable);
    }

    // Menyembunyikan chart dan data table di awal
    chartContainer.style.display = 'none';
    dataTable.style.display = 'none';

    // Back to Beranda (tombol untuk kembali ke beranda)
    const backToBerandaLink = document.getElementById("backToBerandaLink");
    if (backToBerandaLink) {
        backToBerandaLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Kembali ke beranda
            berandaSection.classList.remove('hidden');
            branchSection.classList.add('hidden');
            chartContainer.style.display = 'none';
            dataTable.style.display = 'none';
        });
    }
});
