import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CircleArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { fetchAllProject } from '../../../services/project-services';
import ProjectCard from '../../../components/task-management-components/project-card';

const AddProjectModal = React.lazy(() =>
	import('../../../components/task-management-components/add-project-modal'),
);

function TaskManagement() {
	const navigate = useNavigate();
	const [addModal, showAddModal] = useState(false);
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleAddModal = () => {
		showAddModal(true);
	};

	const handleCloseAdd = () => {
		showAddModal(false);
	};

	useEffect(() => {
		const fetchProjects = async () => {
			setLoading(true);
			try {
				const projectData = await fetchAllProject();

				setProjects(projectData);
			} catch (error) {
				toast.error('Something went wrong');
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
		>
			<Helmet>
				<title>Project Management | FreelanceFlow</title>
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
					content='Project Management | FreelanceFlow'
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

			<div className='task-management-container '>
				<div className='header-container flex flex-row gap-3 justify-between items-center mb-10'>
					<div className='left-side flex flex-row gap-3 items-center'>
						<button
							onClick={() => navigate('/dashboard/')}
							className='back-btn text-lg text-white hover:text-blue-200 cursor-pointer'
						>
							<CircleArrowLeft size={28} />
						</button>

						<h1 className='text-header mt-0.5 text-3xl font-bold tracking-wider'>
							Project Management
						</h1>
					</div>
					<div className='right-side'>
						<button
							onClick={handleAddModal}
							className='flex items-center gap-2 px-3 py-1 pr-5 bg-blue-500 transition-all duration-250 ease-in-out hover:bg-blue-500/80 hover:shadow-2xl cursor-pointer rounded-2xl'
						>
							<Plus />
							Add Project
						</button>
					</div>
				</div>

				<div className='management-content-container relative grid grid-cols-1 md:grid-cols-4 h-fit'>
					<div
						style={{ gridTemplateRows: 'repeat(auto-fill, 200px)' }}
						className='left-container grid-rows-auto grid grid-cols-1 md:grid-cols-4 col-span-4 gap-2 h-182 col-start-1'
					>
						{loading ? (
							[...Array(6)].map((_, i) => (
								<div
									key={i}
									className='animate-pulse bg-gray-800 rounded-lg h-50 p-4 space-y-3 border border-gray-700 shadow-md'
								>
									<div className='h-5 bg-gray-700 rounded w-3/4'></div>
									<div className='h-4 bg-gray-700 rounded w-1/2'></div>
									<div className='h-4 bg-gray-700 rounded w-2/3'></div>
								</div>
							))
						) : projects.length > 0 ? (
							projects.map((project) => (
								<div key={project._id}>
									<ProjectCard
										title={project.title}
										client={project.client.fullname}
										dueDate={new Date(project.createdAt).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
										description={project.description}
										status={project.status}
									/>
								</div>
							))
						) : (
							<div className='no-project-container col-span-full text-center text-gray-400'>
								No Project Available.
							</div>
						)}
					</div>
				</div>
				{addModal && (
					<div className='add-modal-container backdrop-blur-md absolute top-0 left-0 w-full md:flex justify-center items-center h-full z-30 bg-white/5'>
						<AddProjectModal onClose={handleCloseAdd} />
					</div>
				)}
			</div>
		</motion.div>
	);
}

export default TaskManagement;
