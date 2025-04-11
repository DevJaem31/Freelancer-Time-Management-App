import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../../services/user-services';
import {
	ClipboardList,
	Calendar,
	Timer,
	Users,
	DollarSign,
	Clock,
	Settings,
	Bell,
	ChevronDown,
} from 'lucide-react';

const freelancerSections = [
	{ icon: <ClipboardList />, title: 'Task Management', route: '/tasks' },
	{ icon: <Calendar />, title: 'Time Blocking', route: '/calendar' },
	{ icon: <Timer />, title: 'Time Tracker', route: '/tracker' },
	{ icon: <Users />, title: 'Client Manager', route: '/clients' },
	{ icon: <DollarSign />, title: 'Invoicing', route: '/invoices' },
	{ icon: <DollarSign />, title: 'Budgeting', route: '/budget' },
];

const clientSections = [
	{ icon: <Clock />, title: 'Project Timeline', route: '/timeline' },
	{ icon: <DollarSign />, title: 'Invoices', route: '/invoices' },
];

const DashboardPage = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			try {
				const userData = await fetchUser();
				console.log(userData);
				setUser(userData || null);
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};
		getUser();
	}, []);

	const sections = user?.role === 'freelancer' ? freelancerSections : clientSections;

	const stats = {
		tasksDueToday: 3,
		activeTimer: '00:34:12',
		pendingInvoices: 5,
		pendingBudgets: 2,
	};

	return (
		<div className='py-6 px-35 w-full min-h-screen'>
			<div className='dashboard-header-container flex flex-row justify-between shadow-blue-950 mb-5 w-full h-fit'>
				<div className='ml-2.5 greeting-text-container'>
					<h1 className='greeting-header-text'>
						Welcome <strong>{user?.fullname}</strong> !
					</h1>
				</div>

				<div className='utilities-container flex flex-row items-center gap-4'>
					<button className='flex flex-row items-center text-sm cursor-pointer'>
						Tools <ChevronDown />
					</button>
					<Settings />
					<Bell />
				</div>
			</div>
			<div className='mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				<div className=' p-6 rounded-lg shadow-md'>
					<h3 className='font-medium text-gray-600'>Today's Tasks</h3>
					<p className='text-2xl font-bold text-primary'>{stats.tasksDueToday} tasks</p>
				</div>
				<div className=' p-6 rounded-lg shadow-md'>
					<h3 className='font-medium text-gray-600'>Active Timer</h3>
					<p className='text-2xl font-bold text-primary'>{stats.activeTimer}</p>
				</div>
				<div className=' p-6 rounded-lg shadow-md'>
					<h3 className='font-medium text-gray-600'>Pending Invoices</h3>
					<p className='text-2xl font-bold text-primary'>{stats.pendingInvoices} invoices</p>
				</div>
				<div className=' p-6 rounded-lg shadow-md'>
					<h3 className='font-medium text-gray-600'>Pending Budgets</h3>
					<p className='text-2xl font-bold text-primary'>{stats.pendingBudgets} budgets</p>
				</div>
			</div>

			{/* Core Feature Panels */}
			<h2 className='text-xl font-semibold mb-6'>Core Features</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{sections.map((section) => (
					<div
						key={section.title}
						className='cursor-pointer hover:shadow-md transition-shadow duration-200 rounded-2xl border border-gray-200'
						onClick={() => navigate(section.route)}
					>
						<div className='flex flex-col justify-center items-center gap-4 p-6'>
							<div className='text-primary'>{section.icon}</div>
							<h3 className='text-lg font-medium'>{section.title}</h3>
						</div>
					</div>
				))}
			</div>

			{/* Optional Widgets: Resource Library, Productivity Tips, and Notifications */}
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
		</div>
	);
};

export default DashboardPage;
