import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiUrl =
	import.meta.env.VITE_NODE_ENV === 'production'
		? import.meta.env.VITE_PRODUCTION_API_URL
		: import.meta.env.VITE_DEVELOPMENT_API_URL;

export const createProject = async (formData) => {
	try {
		const response = await axios.post(`${apiUrl}create-project`, formData, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		toast.error(error.response.data.message);
		console.error('Project Creation:', error);
		throw error.response?.data || 'Project creation failed';
	}
};

export const fetchAllProject = async () => {
	try {
		const response = await axios.get(`${apiUrl}fetch-all-projects`, { withCredentials: true });

		return response.data.projects;
	} catch (error) {
		return [];
	}
};
