import axios from 'axios';

const apiUrl =
	import.meta.env.VITE_NODE_ENV === 'production'
		? import.meta.env.VITE_PRODUCTION_API_URL
		: import.meta.env.VITE_DEVELOPMENT_API_URL;

export const createAccount = async (userData) => {
	console.log(apiUrl);

	try {
		const response = await axios.post(`${apiUrl}/create-user`, userData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.data;
	} catch (error) {
		console.error('Error creating user:', error);
		throw error;
	}
};
