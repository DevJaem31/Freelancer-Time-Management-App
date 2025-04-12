import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

function PageNotFound() {
	const navigate = useNavigate();

	return (
		<div className='flex flex-col items-center justify-center h-screen px-4'>
			<div className='text-center'>
				<div className='flex justify-center mb-4'>
					<AlertTriangle className='text-yellow-500 w-16 h-16' />
				</div>
				<h1 className='text-4xl font-bold text-gray-500 mb-2'>404 - Page Not Found</h1>
				<p className='text-gray-600 mb-6'>
					Sorry, the page you’re looking for doesn’t exist or has been moved.
				</p>
				<button
					onClick={() => navigate('/dashboard/')}
					className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer'
				>
					Go back home
				</button>
			</div>
		</div>
	);
}

export default PageNotFound;
