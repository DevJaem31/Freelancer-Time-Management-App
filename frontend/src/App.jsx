import React from 'react';
import MainRoutes from './routes/main-routes';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<div className='app-main-container'>
			<div className='app-content-container'>
				<MainRoutes />
			</div>

			<Toaster
				position='top-right'
				reverseOrder={false}
				toastOptions={{
					style: {
						background: '#333',
						color: '#fff',
					},
				}}
			/>
		</div>
	);
}

export default App;
