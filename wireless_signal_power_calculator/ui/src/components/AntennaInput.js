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
                        <Form.Control type="number" step="any" placeholder="Power" name={props.name + "_power"} />
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
                    <CoordinateField name={props.name} />
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
                <Form.Control type="number" placeholder="x" step="any" name={props.name + "_position_x"} />
            </Col>
            <Col xs={4} className="p-1">
                <Form.Control type="number" placeholder="y" step="any" name={props.name + "_position_y"} />
            </Col>
            <Col xs={4} className="p-1">
                <Form.Control type="number" placeholder="z" step="any" name={props.name + "_position_z"} />
            </Col>
        </Row>
    )
}