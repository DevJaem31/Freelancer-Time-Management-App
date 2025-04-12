import React, { useState } from 'react';
import { CircleArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ProjectsNav } from '../../../utils/data/projects-nav';

function TaskManagement() {
	const navigate = useNavigate();
	const [projects, setProjects] = useState(null);

	const NavigationsProject = ProjectsNav;

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
				<div className='header-container flex flex-row gap-3 items-center mb-10'>
					<button
						onClick={() => navigate('/dashboard/')}
						className='back-btn text-lg text-white hover:text-blue-200 cursor-pointer'
					>
						<CircleArrowLeft />
					</button>

					<h1 className='text-header mt-0.5 text-3xl font-bold tracking-wider'>Task Management</h1>
				</div>

				<div className='management-content-container grid grid-cols-1 md:grid-cols-4 h-fit'>
					<div className='left-container col-span-3 h-182 col-start-1'>
						This is where the contents
					</div>
					<div className='right-container col-start-4 h-full border-l-1 border-l-blue-950 p-5 flex flex-col items-center'>
						<div className='header'>
							<h2></h2>
						</div>

						{Object.values(NavigationsProject).map((navigation) => (
							<div
								key={navigation.title}
								className='navigation-container w-full cursor-pointer hover:bg-[var(--card-background-color)] flex flex-col my-2 transition-all duration-200 rounded-lg border border-[var(--card-background-color)]'
								onClick={() => navigation.onClick}
							>
								<div className='flex flex-row justify-center items-center gap-2 py-2'>
									<div className='text-primary'>{navigation.icon}</div>
									<div className='w-[45%]'>
										<h3 className='text-base font-medium text-center'>{navigation.title}</h3>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default TaskManagement;
