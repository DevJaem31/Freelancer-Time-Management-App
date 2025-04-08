console.log(import.meta.env);

const apiUrl =
	import.meta.env.VITE_NODE_ENV === 'production'
		? import.meta.env.VITE_PRODUCTION_API_URL
		: import.meta.env.VITE_DEVELOPMENT_API_URL;

export const logTheURL = () => {
	console.log('API URL:', apiUrl);
};
