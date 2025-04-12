import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../services/user-services';

const PublicRoute = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		const verifySession = async () => {
			const authStatus = await checkAuth();
			setIsAuthenticated(authStatus);
		};
		verifySession();
	}, []);

	if (isAuthenticated === null) return null;

	return isAuthenticated ? (
		<Navigate
			to='/dashboard/home'
			replace
		/>
	) : (
		<Outlet />
	);
};

export default PublicRoute;
