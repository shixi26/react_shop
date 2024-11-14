import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputGroup, Form, Nav } from 'react-bootstrap';
import { Context1 } from './../App.js' //Context 추가

function Detail(props) {

	const { id } = useParams() //url파라미터에 담긴 값을 가져오는 hook
	const [alertVisible, setAlertVisible] = useState(true) //알림div 상태
	const [inputVal, setInputVal] = useState('') //input 상태
	const [inputAlert, setInputAlert] = useState(false) //알림div 상태
	const [tabVisible, setTabVisible] = useState(0) //탭 상태 0번째,1번째,2번째
	const [viewEffect, setViewEffect] = useState('') //화면로드시 상태

	//[id]번째 상품이아닌 상품id가 {id}인거 보여주기
	const goods = props.books.find(function (x) {
		return x.id === Number(id)
	})

	useEffect(() => {//화면로드시
		//타이머
		const timer = setTimeout(() => { setAlertVisible(false) }, 2000)
		//애니메이션
		const load = setTimeout(() => { setViewEffect('end') }, 200)
		return () => {
			clearTimeout(timer, load) //clean up function
		}
	}, [])

	useEffect(() => { //inputVal변할때마다
		if (inputVal !== '' && /\d/.test(inputVal)) {
			setInputAlert(true)
		}
	}, [inputVal])

	// state 보관함 해체해줌 object형식으로 들어옴
	let { stock } = useContext(Context1)

	return (
		<div className={'container start ' + viewEffect}>
			{stock[0]}
			{goods != null && (
				<div style={{ marginTop: '15px' }}>
					<div className="row">
						{alertVisible && (
							<div className="alert alert-warning">
								2초 이내 구매시 할인
							</div>
						)}
						<div className="col-md-6">
							<img src={process.env.PUBLIC_URL + `/img/book${goods.id}.PNG`} alt="상품이미지" style={{ width: '70%' }} />
						</div>
						<div className="col-md-6">
							<h4 className="pt-5">{goods.title}</h4>
							<p>{goods.content}</p>
							<p>{goods.price} 원</p>
							<button className="btn btn-danger">주문하기</button>
							{inputAlert && (
								<div className="alert alert-warning">
									No 숫자
								</div>
							)}
							<InputGroup className="mb-3" style={{ marginTop: '10px' }}>
								<Form.Control
									aria-label="Default"
									aria-describedby="inputGroup-sizing-default"
									onChange={(e) => { setInputVal(e.target.value) }}
								/>
							</InputGroup>
						</div>
					</div>
					<Nav justify variant="tabs" defaultActiveKey="detail" className="mt-3">
						<Nav.Item>
							<Nav.Link eventKey="detail" onClick={() => { setTabVisible(0) }}>상세정보</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="review" onClick={() => { setTabVisible(1) }}>리뷰</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="qna" onClick={() => { setTabVisible(2) }}>Q&A</Nav.Link>
						</Nav.Item>
					</Nav>
					<TabContent tabVisible={tabVisible} />
				</div>
			)}
			{goods == null && <div>없는상품</div>}
		</div>
	)
}

function TabContent({ tabVisible }) {

	const [fade, setFade] = useState('') //탭애니메이션
	let { stock } = useContext(Context1)

	useEffect(() => {
		const timer = setTimeout(() => { setFade('end') }, 200)
		return () => {
			clearTimeout(timer)
			setFade('')
		}
	}, [tabVisible]) // 화면로드 애니메이션

	return (<div className={"start " + fade}>
		{[<div>{stock}</div>, <div>리뷰</div>, <div>qna</div>][tabVisible]}
	</div>)
}

export default Detail;      