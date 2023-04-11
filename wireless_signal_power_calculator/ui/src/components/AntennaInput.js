import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export function AntennaInput(props) {
    return (
        <Card className={props.name + " p-3 mt-2"} >
            <h2> {props.name.charAt(0).toUpperCase() + props.name.slice(1)} </h2>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column xs={6}>
                    Antenna
                </Form.Label>
                <Col xs={6}>
                    <AntennaSelect name={props.name} />
                </Col>
            </Form.Group>
            {props.name !== "receiver" ? (
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column xs={6}>
                        Power
                    </Form.Label>
                    <Col xs={4}>
                        <Form.Control required type="number" step="any" placeholder="Power" name={props.name + "_power"} />
                    </Col>
                    <Col xs={2} className="p-1">
                        <span>mW</span>
                    </Col>
                </Form.Group>
            ) : null}
            <Form.Group as={Row} className="mb-3" controlId="main_distance">
                <Form.Label column xs={3}>
                    Position
                </Form.Label>
                <Col xs={9}>
                    <CoordinateField name={props.name} position={props.position} index={props.index} update={props.update} interferers={props.interferers} setInterferers={props.setInterferers} />
                </Col>
            </Form.Group>
        </Card>
    )
}

function AntennaSelect(props) {
    const antennaNames = JSON.parse(window.antennaNames.replace(/&quot;/g, '"'));
    const options = [];
    for (let i = 0; i < antennaNames.length; i++) {
        let packName = antennaNames[i]
        options.push(<option value={packName}>{packName}</option>)
    }

    return (
        <Form.Control as="select" name={props.name}>
            {options}
        </Form.Control>
    )
}

function CoordinateField(props) {
    return (
        <Row>
            <Col xs={4} className="p-1">
                <Form.Control required type="number" label="x" step="any" name={props.name + "_position_x"} defaultValue={props.position[0]} onChange={e => {
                    if (props.name === "receiver" || props.name === "transmitter") {
                        let newArr = [...props.position];
                        let value = (e.target.value !== "" ? parseFloat(e.target.value) : 0);
                        newArr[0] = value;
                        props.update(newArr);
                    }
                    else {
                        let newArr = [...props.interferers];
                        let value = (e.target.value !== "" ? parseFloat(e.target.value) : 0);
                        newArr[props.index][0] = value;
                        props.setInterferers(newArr);
                    }
                }}
                />
            </Col>
            <Col xs={4} className="p-1">
                <Form.Control required type="number" label="y" step="any" name={props.name + "_position_y"} defaultValue={props.position[1]} onChange={e => {
                    if (props.name === "receiver" || props.name === "transmitter") {
                        let newArr = [...props.position];
                        let value = (e.target.value !== "" ? parseFloat(e.target.value) : 0);
                        newArr[1] = value;
                        props.update(newArr);
                    }
                    else {
                        let newArr = [...props.interferers];
                        let value = (e.target.value !== "" ? parseFloat(e.target.value) : 0);
                        newArr[props.index][1] = value;
                        props.setInterferers(newArr);
                    }
                }} />
            </Col>
            <Col xs={4} className="p-1">
                <Form.Control required type="number" label="z" step="any" name={props.name + "_position_z"} defaultValue={props.position[2]} onChange={e => {
                    if (props.name === "receiver" || props.name === "transmitter") {
                        let newArr = [...props.position];
                        let value = (e.target.value !== "" ? parseFloat(e.target.value) : 0);
                        newArr[2] = value;
                        props.update(newArr);
                    }
                    else {
                        let newArr = [...props.interferers];
                        let value = (e.target.value !== "" ? parseFloat(e.target.value) : 0);
                        newArr[props.index][2] = value;
                        props.setInterferers(newArr);
                    }
                }} />
            </Col>
        </Row>
    )
}