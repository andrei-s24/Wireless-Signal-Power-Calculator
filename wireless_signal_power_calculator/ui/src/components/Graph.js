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
import Table from 'react-bootstrap/Table';
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
    const [mode, setMode] = useState(0);
    const [output, setOutput] = useState({});
    const [showRange, setShowRange] = useState(false);

    useEffect(() => {
        console.log(mode);
        if (mode == 0) {
            setOutput(props.power);
        }
        else {
            setOutput(props.SIR);
        }
    }, [mode, props.power]);

    console.log(showRange);
    let label = "";
    let unit = "";
    if (mode == 0) {
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
    if (output) {
        labels = Object.keys(output);
        calcData = Object.values(output);
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
                <Row>
                    <Model transmitter={props.transmitter} receiver={props.receiver} interferers={props.interferers} maxDistance={props.maxDistance} showRange={showRange} />
                </Row>
                <Row className="mt-3">
                    <Form.Check inline label="Show receiver range under interference" type='checkbox' checked={showRange} onChange={e => { setShowRange(e.target.checked); }} />
                </Row>
            </Col>
            <Col xs={6}>
                <Row>
                    <Line className='line-graph' options={options} data={data} />
                </Row>
                <Row className="mt-3">
                    {props.SIR !== null ? (
                        <Form onChange={e => {
                            setMode(e.target.value);
                        }}>
                            <div>
                                <Form.Check inline label="Receiver Power" type='radio' name="group1" value={0} defaultChecked />
                                <Form.Check inline label="Signal / Interference Ratio" type='radio' name="group1" value={1} />
                            </div>
                        </Form>
                    ) : null}
                </Row>
                <Row className="mt-3">
                    {props.averageValues.length !== 0 ? (
                        <Table striped>
                            <tbody>
                                <tr>
                                    <td>Average Power at Receiver</td>
                                    <td>{props.averageValues[0]}</td>
                                </tr>
                                <tr>
                                    <td>Average Signal to Interference Ratio</td>
                                    <td>{props.averageValues[1]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    ) : null}
                </Row>
            </Col>
        </Row>
    );
}

function Model(props) {
    console.log(props.showRange);
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
                {props.showRange === true ? (
                    <Range position={props.receiver} radius={props.maxDistance} />
                ) : null}
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

function Range(props) {
    return (
        <mesh position={props.position} scale={[props.radius, props.radius, props.radius]}>
            <sphereBufferGeometry attach="geometry" />
            <meshPhongMaterial attach="material" color="black" transparent={true} opacity={0.1} />
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

export default Graph;