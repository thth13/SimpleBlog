import { LOAD_POSTS, LOAD_POST, LOAD_MORE, SET_LOADING, CLEAR_POST, ADD_COMMENT } from '../actions/types';

const initialState = {
	posts: [],
	singlePost: {
		post: {},
		comments: []
	},
	postCount: 0,
	isLoading: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOAD_POSTS:
			return {
				...state,
				posts: action.payload.posts,
				postCount: action.payload.postCount
			}
		case LOAD_POST:
			return {
				...state,
				singlePost: action.payload
			}
		case LOAD_MORE:
			return {
				...state,
				posts: state.posts.concat(action.payload)
			}
		case SET_LOADING:
				return {
					...state,
					isLoading: action.payload
				}
		case CLEAR_POST:
			return {
				...state,
				singlePost: {	
					post: {},
					comments: []
				}
			}
		case ADD_COMMENT: {
			return {
				...state,
				singlePost: {
					...state.singlePost,
					comments: [action.payload, ...state.singlePost.comments]
				}
			}
		}
		default:
			return state;
	}
}