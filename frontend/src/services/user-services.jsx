import axios from 'axios';

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
		console.error('Register error:', error);
		throw error.response?.data || 'Registration failed';
	}
};
