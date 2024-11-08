import { useState } from 'react';
import {Container,Nav,Navbar,Row,Col} from 'react-bootstrap';
import './App.css';
import data from './data.js' //data.js임시데이터
import {Routes, Route, useNavigate, Outlet} from 'react-router-dom';
import Detail from './pages/Detail.js';

function App() {

  const [books] = useState(data)

  const navigate = useNavigate()

  return (
    <div>

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <a href="#home"><img src={process.env.PUBLIC_URL + "/img/hao_logo1.png"} style={{height:'70px',backgroundSize:'cover'}} alt="logo"/></a>
          <Nav className="me-auto">
            <Nav.Link href="/react_shop">Home</Nav.Link>
            <Nav.Link href="/bestSeller">BestSeller</Nav.Link>
            <Nav.Link href="/new">New</Nav.Link>
            <Nav.Link href="/steadySeller">SteadySeller</Nav.Link>
            <Nav.Link onClick={()=>(navigate('/detail'))}>detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/react_shop" element={
          <>
            <div className="main-bg"></div>
            <div>
              <Content books={books}/>
            </div>
          </>
        }/>
        <Route path="/detail" element={<Detail books={books}/>}/> 
        <Route path="*" element={<div>404</div>}/> 
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버</div>}/>
          <Route path="location" element={<About/>}/>
        </Route>
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}/>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>}/>
        </Route>
      </Routes>
    </div>
  );
}

function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet/>
    </div>
  )
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet/>
    </div>
  )
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
