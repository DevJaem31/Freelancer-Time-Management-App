import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiUrl =
	import.meta.env.VITE_NODE_ENV === 'production'
		? import.meta.env.VITE_PRODUCTION_API_URL
		: import.meta.env.VITE_DEVELOPMENT_API_URL;

export const createAccount = async (userData) => {
	try {
		const response = await axios.post(`${apiUrl}create-user`, userData, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		toast.error(error.response.data.message);
		console.error('Register error:', error);
		throw error.response?.data || 'Registration failed';
	}
};

export const loginAccount = async (userData) => {
	try {
		const response = await axios.post(`${apiUrl}login`, userData, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		toast.error(error.response?.data?.message || 'Login failed');
		console.error('Login error:', error);
		throw error.response?.data || 'Login failed';
	}
};

export const checkAuth = async () => {
	try {
		await axios.get(`${apiUrl}check-session`, { withCredentials: true });
		return true;
	} catch (error) {
		console.error('Session error:', error);
		return false;
	}
};

export const fetchUser = async () => {
	try {
		const response = await axios.get(`${apiUrl}fetch-user`, { withCredentials: true });

		return response.data.user;
	} catch (error) {
		console.error('Fetch user error:', error);
		throw error.response?.data || 'Failed to fetch user data';
	}
};
