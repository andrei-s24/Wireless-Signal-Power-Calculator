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
      <Row>
        <Col>
          <Form method="POST">
            {/* CSRF Token not working */}
            <h1> Inputs </h1>
            <br />
            <h2> Transmitter </h2>
            <Form.Group as={Row} className="mb-3" controlId="power">
              <Form.Label column sm={6}>
                Power
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="number" placeholder="Power" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="gain">
              <Form.Label column sm={6}>
                Gain
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="number" placeholder="Gain" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="distance">
              <Form.Label column sm={6}>
                Distance to Receiver
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="number" placeholder="Distance" />
              </Col>
            </Form.Group>
            <br />
            <h2> Receiver </h2>
            <Form.Group as={Row} className="mb-3" controlId="gain">
              <Form.Label column sm={6}>
                Power
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="number" placeholder="Gain" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="distance">
              <Form.Label column sm={6}>
                Gain
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="number" placeholder="Distance" />
              </Col>
            </Form.Group>
            <h2> Interferers </h2>
            <Form.Group as={Row} className="mb-3" controlId="gain">
              <Form.Label column sm={6}>
                Power
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="number" placeholder="Gain" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="distance">
              <Form.Label column sm={6}>
                Gain
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="number" placeholder="Distance" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Submit</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <h1> Graph </h1>
        </Col>
        <Col>
          <h1> Outputs </h1>
        </Col>
      </Row>
    </div>
  );
}

export default App;
