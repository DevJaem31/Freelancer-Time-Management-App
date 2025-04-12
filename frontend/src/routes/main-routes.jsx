import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { AnimatePresence } from 'framer-motion';

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
const TaskManagement = React.lazy(() =>
	import('../pages/dashboard-pages/task-management/tasks-management.jsx'),
);
const LandingPageDashboard = React.lazy(() =>
	import('../pages/dashboard-pages/landing-page-dashboard/landing-page-dashboard.jsx'),
);
import LandingPage from '../pages/landing-page/landing-page.jsx';
import PrivateRoute from './protected-routes.jsx';
import PublicRoute from './public-routes.jsx';

function MainRoutes() {
	return (
		<div>
			<AnimatePresence mode='wait'>
				<Routes>
					<Route element={<PublicRoute />}>
						<Route
							path='/'
							element={<LandingPage />}
						/>

						<Route
							path='/sign-up'
							element={<SignupPage />}
						/>
						<Route
							path='/login'
							element={<LoginPage />}
						/>
					</Route>

					<Route
						path='/terms-of-service'
						element={<TermsOfServicePage />}
					/>
					<Route
						path='/privacy-policy'
						element={<PrivacyPolicyPage />}
					/>

					<Route element={<PrivateRoute />}>
						<Route
							path='/dashboard'
							element={<DashboardPage />}
						>
							<Route
								path='home'
								element={<LandingPageDashboard />}
							/>
							<Route
								path='tasks-manager'
								element={<TaskManagement />}
							/>
						</Route>
					</Route>
				</Routes>
			</AnimatePresence>
		</div>
	);
}

export default MainRoutes;
