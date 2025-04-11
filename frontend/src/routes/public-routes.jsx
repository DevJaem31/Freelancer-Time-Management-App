// src/routes/public-route.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
	const isAuthenticated = !!sessionStorage.getItem('auth');

	return isAuthenticated ? <Navigate to='/dashboard' /> : <Outlet />;
};

export default PublicRoute;
