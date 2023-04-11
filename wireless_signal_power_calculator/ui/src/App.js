// import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Graph from './components/Graph.js';
import { useState, useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar';
import { InputForm } from './components/InputForm';


function App() {
  const [power, setPower] = useState({});
  const [SIR, setSIR] = useState({});
  const [interferers, setInterferers] = useState([]);
  const [transmitter, setTransmitter] = useState([1, 0.5, 0]);
  const [receiver, setReceiver] = useState([0, 0.5, 0]);
  const [maxDistance, setMaxDistance] = useState(0);

  useEffect(() => {
    console.log(interferers);
  }, [interferers])

  return (
    <div className="App">
      <Navbar expand="lg">
        {/* <Navbar.Brand href="#home">RF Calculator</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
      <Container fluid className="mt-3">
        <Row>
          <Col>
            <InputForm setPower={setPower} setSIR={setSIR} setMaxDistance={setMaxDistance} interferers={interferers} setInterferers={setInterferers} transmitter={transmitter} setTransmitter={setTransmitter} receiver={receiver} setReceiver={setReceiver} />
          </Col>
          <Col xs={9}>
            <Graph power={power} SIR={SIR} transmitter={transmitter} receiver={receiver} interferers={interferers} maxDistance={maxDistance} />

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
