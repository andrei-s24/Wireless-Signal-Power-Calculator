import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InputForm(props) {
    return (
        <Form onSubmit={e => {
            e.preventDefault();
            let data = new FormData(e.target);
            let dataEntries = data.entries();
            let URL = "calc_api/calc?";
            for (const pair of dataEntries) {
                let key = pair[0]
                let value = pair[1]
                URL += key + "=" + value + "&";
            }
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            fetch(URL, {
                method: 'GET',
                headers: { "X-CSRFToken": csrftoken }
            }).then(response => response.json())
                .then(data => {
                    props.setData(data["array"]);
                })
                .catch((error) => {
                    console.error('Error:', error)
                });
        }}>
            {/* CSRF Token not working */}
            <h1> Inputs </h1>
            <br />
            <h2> Transmitter </h2>
            <Form.Group as={Row} className="mb-3" controlId="transmitting_antenna">
                <Form.Label column xs={6}>
                    Antenna
                </Form.Label>
                <Col xs={6}>
                    <AntennaSelect name="transmitter" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="transmitter_power">
                <Form.Label column xs={6}>
                    Power
                </Form.Label>
                <Col xs={5}>
                    <Form.Control column xs={6} type="number" placeholder="Power" name="transmitter_power" />
                </Col>
                <Col xs={1} className="p-1">
                    <span>W</span>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="main_distance">
                <Form.Label column xs={6}>
                    Distance to Receiver
                </Form.Label>
                <Col xs={5}>
                    <Form.Control type="number" placeholder="Distance" name="main_distance" />
                </Col>
                <Col xs={1} className="p-1">
                    <span>m</span>
                </Col>
            </Form.Group>
            <br />
            <h2> Receiver </h2>
            <Form.Group as={Row} className="mb-3" controlId="transmitting_antenna">
                <Form.Label column xs={6}>
                    Antenna
                </Form.Label>
                <Col xs={6}>
                    <AntennaSelect name="receiver" />
                </Col>
            </Form.Group>
            <h2> Interferers </h2>
            <Button type="submit" className="custom-btn">Submit</Button>
        </Form>
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

export default InputForm;