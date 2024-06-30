

export const barChartOptions = {
    series: [
        {
            data: [10, 8, 6, 4, 2],
            name: 'Products',
        },
    ],
    options: {
        chart: {
            type: 'bar',
            background: 'transparent',
            height: 350,
            toolbar: {
                show: false,
            },
        },
        colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
        plotOptions: {
            bar: {
                distributed: true,
                borderRadius: 4,
                horizontal: false,
                columnWidth: '40%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            opacity: 1,
        },
        grid: {
            borderColor: '#55596e',
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        legend: {
            labels: {
                colors: 'black',
            },
            show: true,
            position: 'top',
        },
        stroke: {
            colors: ['transparent'],
            show: true,
            width: 2,
        },
        tooltip: {
            shared: true,
            intersect: false,
            theme: 'dark',
        },
        xaxis: {
            categories: ['Laptop', 'Phone', 'Monitor', 'Headphones', 'Camera'],
            title: {
                style: {
                    color: '#f5f7ff',
                },
            },
            axisBorder: {
                show: true,
                color: '#55596e',
            },
            axisTicks: {
                show: true,
                color: '#55596e',
            },
            labels: {
                style: {
                    colors: 'black',
                },
            },
        },
        yaxis: {
            title: {
                text: 'Count',
                style: {
                    color: 'black',
                },
            },
            axisBorder: {
                color: '#55596e',
                show: true,
            },
            axisTicks: {
                color: '#55596e',
                show: true,
            },
            labels: {
                style: {
                    colors: 'black',
                },
            },
        },
    },
};

export const areaChartOptions = {
    series: [
        {
            name: 'Revenue',
            data: [4500, 4200, 4600, 4800, 4700, 5500, 3800], // Replace with actual revenue data
        },
    ],
    options: {
        chart: {
            type: 'area',
            background: 'transparent',
            height: 350,
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        colors: ['#00ab57'], // Choose your preferred color
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        dataLabels: {
            enabled: false,
        },
        fill: {
            gradient: {
                opacityFrom: 0.4,
                opacityTo: 0.1,
                shadeIntensity: 1,
                stops: [0, 100],
                type: 'vertical',
            },
            type: 'gradient',
        },
        grid: {
            borderColor: '#55596e',
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        legend: {
            labels: {
                colors: '#f5f7ff', // Change this to your preferred color
            },
            show: true,
            position: 'top',
        },
        markers: {
            size: 6,
            strokeColors: '#1b2635',
            strokeWidth: 3,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            axisBorder: {
                color: '#55596e',
                show: true,
            },
            axisTicks: {
                color: '#55596e',
                show: true,
            },
            labels: {
                offsetY: 5,
                style: {
                    colors: 'black', // Change this to your preferred color
                },
            },
        },
        yaxis: {
            title: {
                text: 'Revenue',
                style: {
                    color: 'black', // Change this to your preferred color
                },
            },
            labels: {
                style: {
                    colors: ['black'], // Change this to your preferred color
                },
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            theme: 'dark',
        },
    },
};


