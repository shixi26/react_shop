import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
	name: 'user',
	initialState: 'kim',
	reducers: {
		changeName(state) {
			return 'john' + state
		}
	}
})
export let { changeName } = user.actions

let carts = createSlice({
	name: 'carts',
	initialState: [
		{ id: 0, name: 'White and Black', count: 2 },
		{ id: 2, name: 'Grey Yordan', count: 1 }
	],
	reducers: {
		addCart(state, action) {
			const { id } = action.payload;
			return state.map(item => (
				item.id === id
					? { ...item, count: item.count + 1 }
					: item
			))
		}
	}
})
export let { addCart } = carts.actions


export default configureStore({
	reducer: {
		user: user.reducer,
		carts: carts.reducer
	}
}) 