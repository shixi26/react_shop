import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount } from "../store";

function Cart() {

	let states = useSelector((state) => state)
	let dispatch = useDispatch() //redux state변경요청

	return (
		<div className="container">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>No</th>
						<th>id</th>
						<th>name</th>
						<th>count</th>
						<th>추가</th>
					</tr>
				</thead>
				<tbody>
					{states.carts.map((cart, i) => (
						<tr key={i}>
							<td>{i + 1}</td>
							<td>{cart.id}</td>
							<td>{cart.name}</td>
							<td>{cart.count}</td>
							<td><Button onClick={() => {
								dispatch(addCount(cart.id))
							}}>+</Button></td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}
export default Cart;