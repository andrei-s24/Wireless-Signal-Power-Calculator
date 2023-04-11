import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AntennaInput } from './AntennaInput';

export function InputForm(props) {
    function addInterferer() {
        props.setInterferers([...props.interferers, [0, 0.5, 1]]);
    }

    let interferers = [];
    for (let i = 0; i < props.interferers.length; i++) {
        interferers.push(
            <AntennaInput name={"interferer" + (i + 1)} position={props.interferers[i]} index={i} setInterferers={props.setInterferers} interferers={props.interferers} />
        )
    }     

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
                    props.setPower(data["power"]);
                    props.setSIR(data["signal_to_interference_ratio"]);
                    props.setMaxDistance(data["distance"])
                })
                .catch((error) => {
                    console.error('Error:', error)
                });
        }}>
            <AntennaInput name="transmitter" position={props.transmitter} update={props.setTransmitter} />
            <AntennaInput name="receiver" position={props.receiver} update={props.setReceiver}/>
            <Row className="mt-2 mb-2">
                <Col xs={10}>
                    <div class="scrollable">
                        {interferers}
                    </div>
                </Col>
                <Col xs={2}>
                    <Button type="button" className="mt-2" onClick={addInterferer}>+</Button>
                </Col>
            </Row>
            <Button type="submit" className="submit-btn">Submit</Button>
        </Form>
    )
}


