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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Canvas, useFrame } from 'react-three-fiber';
import { useState, useEffect, useRef, useLayoutEffect } from "react";
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
    const [data, setData] = useState({});
    const [mode, setMode] = useState(0);

    useEffect(() => {
        console.log(mode);
        if (mode == 0) {
            setData(props.power);
        }
        else {
            setData(props.SIR);
        }
    }, [mode, props.power]);

    console.log(data);

    return (
        <div>
            <Display modelOn={modelOn} mode={mode} data={data} transmitter={props.transmitter} receiver={props.receiver} interferers={props.interferers} maxDistance={props.maxDistance} />

            <Form.Check inline label="3D Layout" onChange={e => setModelOn(e.target.checked)} />
            {props.SIR ? (
                <Form onChange={e => {
                    setMode(e.target.value);
                }}>
                    <div>
                        <Form.Check inline label="Receiver Power" type='radio' name="group1" value={0} defaultChecked />
                        <Form.Check inline label="Signal / Interference Ratio" type='radio' name="group1" value={1} />
                    </div>
                </Form>
            ) : null}
        </div>
    )

}

function Model(props) {
    return (
        <div id="canvas-container">
            <Canvas frameloop="demand">
                <OrbitControls />
                <gridHelper />
                {props.interferers.map((position) => (
                    <Interferer position={position} color='rgb(255, 128, 128)' />
                ))}
                <Antenna position={props.transmitter} color='rgb(128, 128, 255)' />
                <Antenna position={props.receiver} color='rgb(128, 255, 128)' />
                <Reach position={props.receiver} radius={props.maxDistance} />
            </Canvas>
        </div>
    )
}

function Antenna(props) {  
    return (
      <mesh position={props.position} scale={[0.1, 1, 0.1]}>
        <cylinderBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={props.color} />
      </mesh>
    );
}

function Reach(props) {  
    return (
      <mesh position={props.position} scale={[props.radius, props.radius, props.radius]}>
        <sphereBufferGeometry attach="geometry" />
        <meshPhongMaterial attach="material" color="white" transparent={true} opacity={0.5} />
      </mesh>
    );
}

function Interferer(props) {
    const meshRef = useRef();
  
    useFrame(() => {
      // Update the position of the mesh based on props.position
      meshRef.current.position.set(props.position[0], props.position[1], props.position[2]);
    });
  
    return (
      <mesh ref={meshRef} scale={[0.1, 1, 0.1]}>
        <cylinderBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color='rgb(255, 128, 128)' />
      </mesh>
    );
}

function Display(props) {
    let label = "";
    let unit = "";
    if (props.mode == 0) {
        label = "Power";
        unit = "(dBm)"
    }
    else {
        label = "S/I";
    }
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
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Channel (MHz)"
                }
            },
            y: {
                title: {
                    display: true,
                    text: label + " " + unit
                }
            }
        },
        maintainAspectRatio: false
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
                label: label,
                data: calcData,
                borderColor: 'rgb(127, 0, 255)',
                backgroundColor: 'rgba(127, 0, 255, 0.5)',
            },
        ],
    };
    return (
        <Row>
            <Col>
                <Model transmitter={props.transmitter} receiver={props.receiver} interferers={props.interferers} maxDistance={props.maxDistance} />
            </Col>
            <Col xs={6}>
                <Line className='line-graph' options={options} data={data} />
            </Col>
        </Row>
    );


}

export default Graph;