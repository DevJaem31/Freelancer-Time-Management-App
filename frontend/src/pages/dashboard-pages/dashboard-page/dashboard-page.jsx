import React, { useEffect, useState } from 'react';
import './dashboard-page.css';
import { Helmet } from 'react-helmet';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchUser } from '../../../services/user-services';
import { Settings, Bell, ChevronDown } from 'lucide-react';
import { UserNav } from '../../../utils/data/user-nav';

const DashboardPage = () => {
	const navigate = useNavigate();
	const [toolsModal, setToolsModal] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			try {
				const userData = await fetchUser();

				setUser(userData || null);
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};
		getUser();
	}, []);

	const sections =
		user?.role === 'freelancer' ? UserNav.freelancerSections : UserNav.clientSections;

	const handleShowToolsModal = () => {
		setToolsModal((prev) => !prev);
	};

	const handleToolsClick = (route) => {
		navigate(route);
		setToolsModal(false);
	};

	return (
		<div className='md:py-6 md:px-35 px-5 py-5 w-full min-h-[85vh] relative'>
			<Helmet>
				<title>Dashboard | FreelanceFlow</title>
				<link
					rel='canonical'
					href='https://freelancer-time-management-app.vercel.app/dashboard-page'
				/>
				<meta
					name='description'
					content='Main landing page of the FreelanceFlow to navigate within the dashboard.'
				/>
				<meta
					name='keywords'
					content='FreelanceFlow, Dashboard, Freelancing Platform, Task Management, Time Tracking, Budgeting, Invoicing, Productivity Tools'
				/>
				<meta
					name='robots'
					content='index, follow'
				/>
				<meta
					property='og:title'
					content='Dashboard | FreelanceFlow'
				/>
				<meta
					property='og:description'
					content='Main landing page of the FreelanceFlow to navigate within the dashboard.'
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content='https://freelancer-time-management-app.vercel.app/dashboard'
				/>
				<meta
					property='og:site_name'
					content='FreelanceFlow'
				/>
			</Helmet>
			<div className='dashboard-header-container flex flex-row justify-between mb-5 w-full h-fit border-b-1 pb-3'>
				<div className='greeting-text-container'>
					<h1 className='greeting-header-text text-base md:text-lg lg:text-3xl font-semibold tracking-wider'>
						Welcome <strong className='text-blue-500'>{user?.fullname}</strong> !
					</h1>
				</div>

				<div className='utilities-container flex flex-row items-center gap-4'>
					<button
						onClick={() => handleShowToolsModal()}
						className='flex flex-row items-center text-sm cursor-pointer font-semibold hover:text-blue-100/50 transition-all duration-250 ease-in-out'
					>
						Tools <ChevronDown />
					</button>

					<button className='flex flex-row items-center text-sm cursor-pointer hover:text-blue-100/50 transition-all duration-250 ease-in-out'>
						<Settings />
					</button>

					<button className='flex flex-row items-center text-sm cursor-pointer hover:text-blue-100/50 transition-all duration-250 ease-in-out'>
						<Bell />
					</button>
				</div>
			</div>

			<div className='container-for-scroll h-[85vh] overflow-scroll'>
				<Outlet />
			</div>

			{toolsModal && (
				<div className='bg-[var(--card-accent-color)] p-6 rounded-lg shadow-2xl w-[350px] absolute top-15 md:right-55'>
					{sections.map((section) => (
						<div
							key={section.title}
							className='cursor-pointer hover:bg-[var(--card-background-color)] flex flex-col my-2 transition-all duration-200 rounded-lg border border-[var(--card-background-color)]'
							onClick={() => handleToolsClick(section.route)}
						>
							<div className='flex flex-row justify-center items-center gap-2 py-2'>
								<div className='text-primary'>{section.icon}</div>
								<h3 className='text-base font-medium'>{section.title}</h3>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DashboardPage;
