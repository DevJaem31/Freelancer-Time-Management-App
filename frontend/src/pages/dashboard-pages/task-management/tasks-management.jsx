import React from 'react';
import { CircleArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

function TaskManagement() {
	const navigate = useNavigate();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
		>
			<Helmet>
				<title>Tasks Management | FreelanceFlow</title>
				<link
					rel='canonical'
					href='https://freelancer-time-management-app.vercel.app/TaskManagement'
				/>
				<meta
					name='description'
					content='Tasks Management page of the FreelanceFlow within the dashboard.'
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
					content='Tasks Management | FreelanceFlow'
				/>
				<meta
					property='og:description'
					content='Tasks Management page of the FreelanceFlow within the dashboard.'
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content='https://freelancer-time-management-app.vercel.app/tasks-management'
				/>
				<meta
					property='og:site_name'
					content='FreelanceFlow'
				/>
			</Helmet>

			<div className='task-management-container'>
				<div className='header-container flex flex-row gap-3 items-center'>
					<button
						onClick={() => navigate('/dashboard/home')}
						className='back-btn text-lg text-white hover:text-blue-200 cursor-pointer'
					>
						<CircleArrowLeft />
					</button>

					<h1 className='text-header mt-0.5 text-3xl font-bold tracking-wider'>Task Management</h1>
				</div>
			</div>
		</motion.div>
	);
}

export default TaskManagement;
