import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

	const stats = {
		tasksDueToday: 5,
		activeTimers: [],
		pendingInvoices: 5,
		pendingBudgets: 2,
	};

	const handleShowToolsModal = () => {
		setToolsModal((prev) => !prev);
	};

	const timeToSeconds = (timeStr) => {
		const [h, m, s] = timeStr.split(':').map(Number);
		return h * 3600 + m * 60 + s;
	};

	const shortestTimer = stats.activeTimers.length
		? stats.activeTimers.reduce((shortest, current) =>
				timeToSeconds(current.time) < timeToSeconds(shortest.time) ? current : shortest,
		  )
		: null;

	return (
		<div className='md:py-6 md:px-35 px-5 py-5 w-full min-h-screen relative'>
			<Helmet>
				<title>Dashboard | FreelanceFlow</title>
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
			<div className='dashboard-header-container flex flex-row justify-between shadow-blue-950 mb-5 w-full h-fit'>
				<div className='ml-2.5 greeting-text-container'>
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

			<div className='mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[var(--card-accent-color)] p-6 rounded-lg shadow-lg'>
				<div className='p-6 shadow-md bg-[var(--card-background-color)] rounded-md '>
					<h3 className='font-medium text-gray-400 mb-1'>Active Timer</h3>

					{shortestTimer ? (
						<div className='p-4 rounded-md'>
							<p className='text-sm text-gray-500'>{shortestTimer.task}</p>
							<p className='text-xl font-semibold text-blue-600'>{shortestTimer.time}</p>
						</div>
					) : (
						<p className='text-sm text-gray-400 text-center p-4'>No active timers</p>
					)}
				</div>

				<div className='p-6 shadow-md bg-[var(--card-background-color)] rounded-md '>
					<h3 className='font-medium text-gray-400 mb-1'>Today's Tasks</h3>
					{stats.tasksDueToday > 0 ? (
						<p className='text-xl font-semibold mt-4 text-blue-600 text-center'>
							{stats.tasksDueToday} Tasks
						</p>
					) : (
						<p className='text-sm text-gray-400 text-center p-4'>No available tasks</p>
					)}
				</div>

				<div className='p-6 shadow-md bg-[var(--card-background-color)] rounded-md'>
					<h3 className='font-medium text-gray-400 mb-1'>Pending Invoices</h3>
					{stats.pendingInvoices > 0 ? (
						<p className='text-xl font-semibold mt-4 text-blue-600 text-center'>
							{stats.pendingInvoices} Invoices
						</p>
					) : (
						<p className='text-sm text-gray-400 text-center p-4'>No available invoices</p>
					)}
				</div>

				<div className='p-6 shadow-md bg-[var(--card-background-color)] rounded-md'>
					<h3 className='font-medium text-gray-400 mb-1'>Pending Budgets</h3>
					{stats.pendingBudgets > 0 ? (
						<p className='text-xl font-semibold mt-4 text-blue-600 text-center'>
							{stats.pendingBudgets} Budgets
						</p>
					) : (
						<p className='text-sm text-gray-400 text-center p-4'>No available budgets</p>
					)}
				</div>
			</div>

			<div className='mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className=' p-6 rounded-lg shadow-md'>
					<h3 className='font-medium text-gray-600'>Resource Library Highlights</h3>
					<p className='text-gray-500'>Quick access to your most used resources.</p>
				</div>
				<div className=' p-6 rounded-lg shadow-md'>
					<h3 className='font-medium text-gray-600'>Tip of the Day</h3>
					<p className='text-gray-500'>
						“Break tasks into smaller chunks to improve productivity!”
					</p>
				</div>
				<div className=' p-6 rounded-lg shadow-md'>
					<h3 className='font-medium text-gray-600'>Notifications</h3>
					<p className='text-gray-500'>You have 3 new notifications from clients.</p>
				</div>
			</div>

			{toolsModal && (
				<div className='bg-[var(--card-accent-color)] p-6 rounded-lg shadow-2xl w-[350px] absolute top-15 md:right-55'>
					{sections.map((section) => (
						<div
							key={section.title}
							className='cursor-pointer hover:bg-[var(--card-background-color)] flex flex-col my-2 transition-all duration-200 rounded-lg border border-[var(--card-background-color)]'
							onClick={() => navigate(section.route)}
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
