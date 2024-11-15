import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js' //slice파일 분리

let carts = createSlice({
	name: 'carts',
	initialState: [
		{ id: 0, name: 'White and Black', count: 2 },
		{ id: 2, name: 'Grey Yordan', count: 1 }
	],
	reducers: {
		addCount(state, action) {
			let num = state.findIndex((a) => a.id === action.payload)
			state[num].count++
		},
		addItem(state, action) {
			let num = state.findIndex((a) => a.id === action.payload.id)
			if (num < 0) {
				state.push(action.payload)
			} else {
				state[num].count++
			}
		}
	}
})
export let { addCount, addItem } = carts.actions


export default configureStore({
	reducer: {
		user: user.reducer,
		carts: carts.reducer
	}
}) 