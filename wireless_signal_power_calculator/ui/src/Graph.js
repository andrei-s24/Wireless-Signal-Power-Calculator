import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



function Graph(props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false
            },
        },
    };
    var labels = []
    var calcData = []
    if (props.data) {
        labels = Object.keys(props.data);
        calcData = Object.values(props.data);
    }
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: calcData,
                borderColor: 'rgb(127, 0, 255)',
                backgroundColor: 'rgba(127, 0, 255, 0.5)',
            },
        ],
    };
    return <Line options={options} data={data} />

}

export default Graph;