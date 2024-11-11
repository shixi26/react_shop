import { useState } from 'react';
import {Container,Nav,Navbar,Row,Col,Button} from 'react-bootstrap';
import './App.module.css';
import data from './data.js' //data.js임시데이터
import {Routes, Route, useNavigate, Outlet} from 'react-router-dom';
import Detail from './pages/Detail.js';

function App() {

  const [books,setBooks] = useState(data)

  const navigate = useNavigate()
  
  //가나다순 정렬
  const handleSort=()=>{
    let copy = [...books]
    copy.sort((a,b)=>{ //sort함수
      if (a.title < b.title) return -1 // a가 b보다 작으면 a가 먼저 오도록
      if (a.title > b.title) return 1 // a가 b보다 크면 b가 먼저 오도록
      return 0 // a와 b가 같으면 순서 유지
    })
    setBooks(copy)
  }

  return (
    <div>

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <a href="/"><img src={process.env.PUBLIC_URL + "/img/hao_logo1.png"} style={{height:'70px',backgroundSize:'cover'}} alt="logo"/></a>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/bestSeller">BestSeller</Nav.Link>
            <Nav.Link href="/new">New</Nav.Link>
            <Nav.Link href="/steadySeller">SteadySeller</Nav.Link>
            <Nav.Link onClick={()=>(navigate('/detail/:id'))}>detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div>
              <Button variant="primary" onClick={handleSort}>정렬</Button>
              <Content books={books}/>
            </div>
          </>
        }/>
        <Route path="react_shop/detail/:id" element={<Detail books={books}/>}/> {/**url 파라미터 */}
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
        <Col key={i}>
          <img src={process.env.PUBLIC_URL + `/img/book${book?.itemId}.PNG`} alt="" width={"90%"}/>
          <h4><a href={`/detail/${book?.itemId}`}>{book?.title}</a></h4>
          <p>{book?.price}</p>
        </Col>
      ))}
    </Row>
  </Container>
  )
  
}

export default App;
