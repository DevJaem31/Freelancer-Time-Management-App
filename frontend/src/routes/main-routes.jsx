import { Routes, Route } from 'react-router-dom';
import React from 'react';

import LandingPage from '../pages/landing-page/landing-page.jsx';

function MainRoutes() {
	return (
		<div>
			<Routes>
				<Route
					path='/'
					element={<LandingPage />}
				/>
				<Route path='/login' />
			</Routes>
		</div>
	);
}

export default MainRoutes;
