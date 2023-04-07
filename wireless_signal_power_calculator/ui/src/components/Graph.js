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
import Form from 'react-bootstrap/Form';
import { Canvas, useFrame } from 'react-three-fiber';
import { useState, useRef } from "react";
import { OrbitControls } from '@react-three/drei'

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
    const [modelOn, setModelOn] = useState(false);

    return (
        <div>
            <Display modelOn={modelOn} data={props.data} transmitter={props.transmitter} receiver={props.receiver}/>
            <Form>
                <Form.Check inline label="3D Layout" onChange={e => setModelOn(e.target.checked)} />
            </Form>
        </div>
    )

}

function Model(props) {
    console.log(props.distance);
    return (
        <div id="canvas-container">
            <Canvas>
                <OrbitControls />
                <gridHelper />
                <Antenna position={props.transmitter}/>
                <Antenna position={props.receiver}/>
            </Canvas>
        </div>
    )
}

function Antenna(props) {
    const myref = useRef();
    return (
        <mesh ref={myref} position={props.position} scale={[0.1, 1, 0.1]}>
            <cylinderBufferGeometry attach="geometry"  />
            <meshBasicMaterial attach="material" color="white" />
        </mesh>
    );
}

function Display(props) {
    if (props.modelOn === false) {
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
                    label: 'Power',
                    data: calcData,
                    borderColor: 'rgb(127, 0, 255)',
                    backgroundColor: 'rgba(127, 0, 255, 0.5)',
                },
            ],
        };
        return (
            <Line options={options} data={data} />
        );
    }
    else {
        return (
            <Model transmitter={props.transmitter} receiver={props.receiver} />
        )
    }

}

export default Graph;