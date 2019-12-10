import axios from 'axios';
import { LOAD_POSTS, LOAD_POST, LOAD_MORE, SET_ERRORS, SET_LOADING, CLEAR_POST, ADD_COMMENT } from './types';

export const loadPosts = () => dispatch => {
  axios.get('/api/post/all')
    .then(res =>
      dispatch({ type: LOAD_POSTS, payload: res.data })
    )
    .catch(err => console.log(err));
};

export const loadOnePost = id => dispatch => {
  axios.get(`/api/post/get/${id}`)
    .then(res => {
      dispatch({ type: LOAD_POST, payload: res.data });
    })
    .catch(err => console.log(err));
}


export const loadMore = length => dispatch => {
  dispatch({ type: SET_LOADING, payload: true });

  axios.get(`/api/post/loadmore/${length}`)
    .then(res => {
      dispatch({ type: LOAD_MORE, payload: res.data });
      dispatch({ type: SET_LOADING, payload: false });
    })
    .catch(err => console.log(err.response))
}

export const createPost = (fields, history) => dispatch => {
  let data = new FormData();
  
  data.append('title', fields.title)
  data.append('content', fields.content)
  data.append('category', fields.category)
  data.append('file', fields.image);
  
  axios.post('/api/post/create', data)
    .then(res => history.push('/'))
    .catch(err => 
      dispatch({ type: SET_ERRORS, payload: err.response.data })
  )
}

export const addComment = (postId, comment) => dispatch => {
  axios.post(`/api/post/addcomment/${postId}`, { comment })
    .then(res => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

export const clearPost = () => ({
  type: CLEAR_POST
})