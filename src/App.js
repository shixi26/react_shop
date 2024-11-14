import { createContext, useState } from 'react';
import { Spinner, Container, Nav, Navbar, Row, Col, Button } from 'react-bootstrap';
import data from './data.js' //data.js임시데이터
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail.js';
import axios from 'axios' //axios 추가
import './App.css'

export let Context1 = createContext()

function App() {

	const [books, setBooks] = useState(data) // 상품 state
	const [clickCnt, setClickCnt] = useState(0) // 더보기 버튼 클릭 수 state
	const [spin, setSpin] = useState(false) //로딩중ui state
	const [stock, setStock] = useState([10, 11, 12]) //재고 상태

	const navigate = useNavigate()

	//가나다순 정렬
	const handleSort = () => {
		let copy = [...books]
		copy.sort((a, b) => { //sort함수
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
					<a href="/react_shop"><img src={process.env.PUBLIC_URL + "/img/hao_logo1.png"} style={{ height: '70px', backgroundSize: 'cover' }} alt="logo" /></a>
					<Nav className="me-auto">
						<Nav.Link href="/react_shop">Home</Nav.Link>
						<Nav.Link href="/bestSeller">BestSeller</Nav.Link>
						<Nav.Link href="/new">New</Nav.Link>
						<Nav.Link href="/steadySeller">SteadySeller</Nav.Link>
						<Nav.Link onClick={() => (navigate(`/react_shop/detail/0`))}>detail</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Routes>
				<Route path="/react_shop" element={
					<>
						<div className="main-bg"></div>
						<div>
							<Button variant="primary" onClick={handleSort}>정렬</Button>
							<Content books={books} />
							{spin && (<Spin />)}
							<Button variant="primary" onClick={() => {
								setSpin(true) //로딩ui show
								setClickCnt(clickCnt + 1)
								axios.get(`https://codingapple1.github.io/shop/data${clickCnt + 2}.json`)
									.then((result) => {
										const res = result.data
										const copy = [...books, ...res]
										setBooks(copy)
										setSpin(false) //로딩ui 숨기기
									})
									.catch(() => {
										console.log('실패')
										setSpin(false) //로딩ui 숨기기
									})
							}} disabled={clickCnt === 2}>더보기</Button>
						</div>
					</>
				} />
				<Route path="/react_shop/detail/:id" element={<Context1.Provider value={{ stock }}><Detail books={books} /></Context1.Provider>} /> {/**url 파라미터 */}
				<Route path="/about" element={<About />}>
					<Route path="member" element={<div>멤버</div>} />
					<Route path="location" element={<About />} />
				</Route>
				<Route path="/event" element={<Event />}>
					<Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>} />
					<Route path="two" element={<p>생일기념 쿠폰받기</p>} />
				</Route>
				<Route path="*" element={<div>404</div>} />
			</Routes>
		</div>
	);
}

function Event() {
	return (
		<div>
			<h4>오늘의 이벤트</h4>
			<Outlet />
		</div>
	)
}

function About() {
	return (
		<div>
			<h4>회사정보임</h4>
			<Outlet />
		</div>
	)
}

function Content(props) {
	return (
		<Container>
			<Row>
				{props.books.map((book, i) => (
					<Col key={i}>
						<a href={`/react_shop/detail/${book?.id}`}><img src={process.env.PUBLIC_URL + `/img/book${book?.id}.PNG`} alt="" width={"90%"} /></a>
						<h4><a href={`/react_shop/detail/${book?.id}`}>{book?.title}</a></h4>
						<p>{book?.price}</p>
					</Col>
				))}
			</Row>
		</Container>
	)

}

function Spin() {
	return (
		<Spinner animation="border" role="status">
			<span className="visually-hidden">Loading...</span>
		</Spinner>
	)
}

export default App;
