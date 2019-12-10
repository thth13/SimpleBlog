import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER, AUTH_MODAL } from './types';


export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/user/register', userData)
		.then(res => {
			history.push('/');
		})
		.catch(err => {
			dispatch({
				type: 'SET_ERRORS',
				payload: err.response.data
			})
		});
};

export const loginUser = (userData, history) => dispatch => {
	axios.post('/api/user/login', userData)
		.then(res => {
			const { token } = res.data; // Берем токен пришедишй с API
			localStorage.setItem('jwtToken', token); // Сейваем в локалсторадже
			setAuthToken(token); // Устанавливем заголовок
			const decoded = jwt_decode(token); // Декодируем токен
			dispatch(setCurrentUser(decoded)); // Вызываем экшн для сохранения юзера
			history.push('/');
		})
		.catch(err => {
			dispatch({
				type: 'SET_ERRORS',
				payload: err.response.data
			})
		});
}

export const setCurrentUser = decoded => {
	return {
		// Записываем юзера в стор
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const logoutUser = () => dispatch => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};

export const setAuthModal = () => {
	return {
		type: AUTH_MODAL
	};
};
