function showChart() {
    var selectedOption = document.getElementById("selectOption").value;
    var chartData;

    // Prepare data for the chart based on the selected option
    switch (selectedOption) {
        case "option1":
            chartData = {
                labels: ['Son', 'Nước hoa', 'Kem chống nắng', 'Toner', 'Phấn phủ', 'Kem mụn', 'Dầu gội', 'Dầu xả', 'Xịt tóc', 'Son dưỡng'],
                datasets: [{
                    label: 'Số lượng bán được',
                    data: [10, 16, 25, 38, 48, 42, 35, 28, 20, 10],
                    backgroundColor: ['#C6A4B8', '#FFD0D0', '#FACD89', '#F27280', '#F9B294', '#82BABD', '#99A1C6', '#FFF9AA', '#B63131', '#B5EAB6'],
                }]
            };
            break;
        case "option2":
            chartData = {
                labels: ['Nước hoa', 'Kem chống nắng', 'Nước toner', 'Son môi', 'Phấn phủ'],
                datasets: [{
                    label: 'Số lượng tồn',
                    data: [115, 86, 68, 95, 25],
                    backgroundColor: ['#C6A4B8', '#E9A19B', '#52866C', '#B63131', '#FACD89'],
                }]
            };
            break;
        case "option3":
            chartData = {
                labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
                datasets: [{
                    label: 'Doanh thu',
                    data: [2000000, 8500000, 4000000, 6000000, 7000000, 3000000, 6000000],
                    backgroundColor: ['#52866C', '#FFD0D0', '#99A1C6', '#B63131', '#F9B294', '#B2D3C2', '#82BABD'],
                }]
            };
            break;
        default:
            chartData = {};
    }

    // Get the canvas context
    var ctx = document.getElementById('myChart').getContext('2d');

    // Destroy the previous chart if it exists
    if (window.myChart && window.myChart.destroy) {
        window.myChart.destroy();
    }

    // Create a new chart with animation
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 500, // Thời gian chuyển động (ms)
                easing: 'linear' // Loại hiệu ứng chuyển động (có thể thay đổi)
            }
        }
    });
}

// Display the default chart on page load
showChart();