import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiUrl =
	import.meta.env.VITE_NODE_ENV === 'production'
		? import.meta.env.VITE_PRODUCTION_API_URL
		: import.meta.env.VITE_DEVELOPMENT_API_URL;

export const addTask = async (projectID, taskData) => {
	try {
		const response = await axios.post(`${apiUrl}create-task/${projectID}`, taskData);

		if (response.status === 201) {
			return response.data;
		} else {
			throw new Error('Failed to create task');
		}
	} catch (error) {
		toast.error('Failed to Create Task!');
		console.error('Error:', error);
	}
};

export const fetchProjectTasks = async (projectID) => {
	try {
		const response = await axios.get(`${apiUrl}fetch-project-tasks/${projectID}`, {
			withCredentials: true,
		});

		return response.data.foundTask;
	} catch {
		return [];
	}
};
