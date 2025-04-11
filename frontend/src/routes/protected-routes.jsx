import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../services/user-services';

const PrivateRoute = () => {
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
		<Outlet />
	) : (
		<Navigate
			to='/login'
			replace
		/>
	);
};

export default PrivateRoute;
