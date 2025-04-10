import { Routes, Route } from 'react-router-dom';
import React from 'react';

const TermsOfServicePage = React.lazy(() =>
	import('../pages/additional-pages/terms-of-service-page.jsx'),
);
const PrivacyPolicyPage = React.lazy(() =>
	import('../pages/additional-pages/privacy-and-policy.jsx'),
);
const SignupPage = React.lazy(() => import('../pages/auth-pages/signup-page/signup-page.jsx'));
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
				<Route
					path='/privacy-policy'
					element={<PrivacyPolicyPage />}
				/>
				<Route
					path='/sign-up'
					element={<SignupPage />}
				/>
			</Routes>
		</div>
	);
}

export default MainRoutes;
