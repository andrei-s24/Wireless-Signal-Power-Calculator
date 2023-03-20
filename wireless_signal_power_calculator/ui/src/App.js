// import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Graph from './components/Graph.js';
import { useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import { InputForm, GraphSelect } from './components/InputForm';


function App() {
  const [data, setData] = useState({});
  return (
    <div className="App">
      <Navbar expand="lg">
        <Navbar.Brand href="#home">RF Calculator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
      <Container fluid className="mt-3">
        <Row>
          <Col>
            <InputForm setData={setData} />
          </Col>
          <Col xs={6}>
            <h1> Graph </h1>
            <Graph data={data} />
            <GraphSelect />
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
