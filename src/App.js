import { useState } from 'react';
import { Spinner, Container, Nav, Navbar, Row, Col, Button } from 'react-bootstrap';
import data from './data.js' //data.js임시데이터
import { Routes, Route, useNavigate } from 'react-router-dom';
import Detail from './pages/Detail.js';
import Cart from './pages/Cart.js';
import axios from 'axios' //axios 추가
import './App.css'
import FloatingBanner from './FloatingBanner.js';

function App() {

	const [books, setBooks] = useState(data) // 상품 state
	const [clickCnt, setClickCnt] = useState(0) // 더보기 버튼 클릭 수 state
	const [spin, setSpin] = useState(false) //로딩중ui state
	const navigator = useNavigate() //navigator 훅

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
						<Nav.Link onClick={() => (navigator('react_shop'))}>Home</Nav.Link>
						<Nav.Link onClick={() => (navigator('react_shop/bestSeller'))}>BestSeller</Nav.Link>
						<Nav.Link onClick={() => (navigator('react_shop/new'))}>New</Nav.Link>
						<Nav.Link onClick={() => (navigator('react_shop/steadySeller'))}>SteadySeller</Nav.Link>
						<Nav.Link onClick={() => (navigator('react_shop/cart'))}>Cart</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Routes>
				<Route path="/react_shop" element={
					<>
						<div className="main-bg"></div>
						<div>
							<div className="btn-area-right">
								<Button variant="primary" onClick={handleSort}>정렬</Button>
							</div>
							<Content books={books} />
							<div className='btn-area-center'>
								<Button variant="link"
									id={"more_" + 0 + clickCnt}
									onClick={() => {
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
									}}
									disabled={clickCnt >= 2 || spin}>
									{spin ? (
										<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
									) : ('더보기')}
								</Button>
							</div>
						</div>
						<FloatingBanner />
					</>
				} />
				<Route path="/react_shop/detail/:id" element={<Detail books={books} />} />  {/**url 파라미터 */}
				<Route path="/react_shop/cart" element={<Cart />} />
				<Route path="*" element={<div>404</div>} />
			</Routes>
		</div>
	);
}

function Content(props) {
	return (
		<Container>
			<Row>
				{props.books.map((book, i) => (
					<Col key={i} md={4}>
						<a href={`/react_shop/detail/${book?.id}`}><img src={process.env.PUBLIC_URL + `/img/book${book?.id}.PNG`} alt="" width={"90%"} /></a>
						<h4><a href={`/react_shop/detail/${book?.id}`}>{book?.title}</a></h4>
						<p>{book?.price}</p>
					</Col>
				))}
			</Row>
		</Container>
	)
}

export default App;
