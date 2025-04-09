import { Routes, Route } from 'react-router-dom';
import React from 'react';

import TermsOfServicePage from '../pages/additional-pages/terms-of-service-page.jsx';
import LandingPage from '../pages/landing-page/landing-page.jsx';

function MainRoutes() {
	return (
		<div>
			<Routes>
				<Route
					path='/'
					element={<LandingPage />}
				/>
				<Route
					path='/terms-of-service'
					element={<TermsOfServicePage />}
				/>
			</Routes>
		</div>
	);
}

export default MainRoutes;
