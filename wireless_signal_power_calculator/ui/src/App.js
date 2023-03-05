import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
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
                  console.log(data);
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
                <Col xs={6}>
                  <Form.Control type="number" placeholder="Power" name="transmitter_power" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="main_distance">
                <Form.Label column xs={6}>
                  Distance to Receiver
                </Form.Label>
                <Col xs={6}>
                  <Form.Control type="number" placeholder="Distance" name="main_distance" />
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
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
          <Col xs={6}>
            <h1> Graph </h1>
          </Col>
          <Col>
            <h1> Outputs </h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
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

export default App;
