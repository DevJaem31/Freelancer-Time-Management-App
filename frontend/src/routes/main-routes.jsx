import { Routes, Route } from 'react-router-dom';
import React from 'react';

const DashboardPage = React.lazy(() =>
	import('../pages/dashboard-pages/dashboard-page/dashboard-page.jsx'),
);
const TermsOfServicePage = React.lazy(() =>
	import('../pages/additional-pages/terms-of-service-page.jsx'),
);
const PrivacyPolicyPage = React.lazy(() =>
	import('../pages/additional-pages/privacy-and-policy.jsx'),
);
const LoginPage = React.lazy(() => import('../pages/auth-pages/login-page/login-page.jsx'));
const SignupPage = React.lazy(() => import('../pages/auth-pages/signup-page/signup-page.jsx'));
import LandingPage from '../pages/landing-page/landing-page.jsx';
import PrivateRoute from './protected-routes.jsx';

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
				<Route
					path='/login'
					element={<LoginPage />}
				/>
				<Route element={<PrivateRoute />}>
					<Route
						path='/dashboard'
						element={<DashboardPage />}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default MainRoutes;
