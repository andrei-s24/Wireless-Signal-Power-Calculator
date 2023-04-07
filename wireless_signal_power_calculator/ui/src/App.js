// import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Graph from './components/Graph.js';
import { useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import { InputForm } from './components/InputForm';


function App() {
  const [data, setData] = useState({});
  const [distance, setDistance] = useState(1);
  const [interferers, setInterferers] = useState([]);
  const [transmitter, setTransmitter] = useState([0, 0.5, 0]);
  const [receiver, setReceiver] = useState([1, 0.5, 0]);

  return (
    <div className="App">
      <Navbar expand="lg">
        {/* <Navbar.Brand href="#home">RF Calculator</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
      <Container fluid className="mt-3">
        <Row>
          <Col>
            <InputForm setData={setData} interferers={interferers} setInterferers={setInterferers} transmitter={transmitter} setTransmitter={setTransmitter} receiver={receiver} setReceiver={setReceiver} />
          </Col>
          <Col xs={6}>
            <h1> Graph </h1>
            <Graph data={data} transmitter={transmitter} receiver={receiver} />
            
          </Col>
          <Col>
            <h1> Outputs </h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
