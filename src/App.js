import { useState } from 'react';
import {Container,Nav,Navbar,Row,Col} from 'react-bootstrap';
import './App.css';
import data from './data.js' //data.js임시데이터

function App() {

  const [books] = useState(data)

  return (
    <div>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <a href="#home"><img src="/img/hao_logo1.png" style={{height:'10%',backgroundSize:'cover'}} alt="logo"/></a>
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">BestSeller</Nav.Link>
            <Nav.Link href="#">New</Nav.Link>
            <Nav.Link href="#">SteadySeller</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg"></div>
      <Content books={books}/>
    </div>
  );
}

function Content(props) {
  return(
    <Container>
    <Row>
      {props.books.map((book,i)=>(
        <Col key={book?.id}>
          <img src={process.env.PUBLIC_URL + "/img/book"+i+".PNG"} alt="" width={"90%"}/>
          <h4>{book?.title}</h4>
          <p>{book?.price}</p>
        </Col>
      ))}
    </Row>
  </Container>
  )
  
}

export default App;
