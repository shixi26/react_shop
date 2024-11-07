import {Container,Nav,Navbar,Row,Col} from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <a href="#home"><img src="/img/hao_logo1.png" style={{height:'80px',backgroundSize:'cover'}} alt="logo"/></a>
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">BestSeller</Nav.Link>
            <Nav.Link href="#">New</Nav.Link>
            <Nav.Link href="#">SteadySeller</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg"></div>
      <Container>
        <Row>
          <Col>
            <img src={process.env.PUBLIC_URL + "/img/book.PNG"} alt="" width={"90%"}/>
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col>
            <img src={process.env.PUBLIC_URL + "/img/book2.PNG"} alt="" width={"90%"}/>
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col>            
            <img src={process.env.PUBLIC_URL + "/img/book3.PNG"} alt=""width={"90%"}/>
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
