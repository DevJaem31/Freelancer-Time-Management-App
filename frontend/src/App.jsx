import React from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<div className='app-main-container'>
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
