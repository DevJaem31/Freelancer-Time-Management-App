import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircleArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { fetchProjectID } from '../../../services/project-services';
import { fetchProjectTasks } from '../../../services/task-services';
import { statusColors } from '../../../utils/data/status';
import { toast } from 'react-hot-toast';

const AddTaskModal = React.lazy(() =>
	import('../../../components/task-management-components/add-task-modal'),
);
import TasksContainer from '../../../components/task-management-components/tasks';

function EditProject() {
	const [project, setProject] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [addTask, showAddTask] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	const getTasks = async () => {
		setLoading(true);
		try {
			if (!id) {
				toast.error('Failed to fetch the project ID');
			}

			const taskData = await fetchProjectTasks(id);
			setTasks(taskData);
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchProject = async () => {
			setLoading(true);
			try {
				const projectData = await fetchProjectID(id);
				setProject(projectData);
			} catch (error) {
				if (error.response?.status === 403) {
					navigate('/dashboard/access-denied');
				} else {
					toast.error('Something went wrong');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
		getTasks();
	}, [id, navigate]);

	const handleTaskModal = () => {
		showAddTask(true);
	};

	const handleCloseTask = () => {
		showAddTask(false);
	};

	return (
		<>
			{loading ? (
				<div className='loading flex justify-center items-center min-h-40 h-screen'>
					<div className='relative w-10 h-10'>
						<div className='absolute inset-0 rounded-full border-4 border-t-transparent border-indigo-500 animate-spin' />
					</div>
				</div>
			) : (
				<div>
					<div className='header-container flex flex-row items center gap-2 md:text-lg justify-between'>
						<div className='left-side  flex flex-row items center gap-2'>
							<button
								onClick={() => navigate('/dashboard/projects-manager')}
								className='back-btn text-lg text-white hover:text-blue-200 cursor-pointer'
							>
								<CircleArrowLeft size={28} />
							</button>

							<div className='header-column'>
								<h1 className='text-header text-lg md:text-2xl font-bold tracking-wider'>
									{project.title}
								</h1>

								<p className='text-xs opacity-50 mt-[-0.3rem]'>
									Deadline:{' '}
									{new Date(project.dueDate).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							</div>
						</div>

						<div className='right-side flex flex-row gap-5 items-center'>
							<button>
								<Pencil size={20} />
							</button>
							<button className='text-red-800 cursor-pointer text-shadow-red-950 shadow-lg'>
								<Trash2 size={20} />
							</button>
						</div>
					</div>

					<div className='main-content-container md:my-10 my-5 flex flex-col items-start gap-3 md:mx-15'>
						<div className='project-details-container flex flex-col gap-1'>
							<div className='section-container flex gap-3'>
								<h2 className='label-content text-gray-500'>Client: </h2>
								<p>{project.client?.fullname}</p>
							</div>

							<div className='section-container flex gap-3'>
								<h2 className='label-content text-gray-500'>Project Head: </h2>
								<p>{project.createdBy?.fullname}</p>
							</div>

							<div className='section-container flex md:flex-row flex-col md:gap-5 '>
								<h2 className='label-content text-gray-500'>Description: </h2>
								<p>{project.description}</p>
							</div>

							{project?.collaborators && project.collaborators.length > 0 && (
								<div className='section-container flex md:flex-row flex-col md:gap-5 '>
									<h2 className='label-content text-gray-500'>Collaborators:</h2>
									<div className='flex flex-wrap gap-2'>
										{project.collaborators.map((collaborator) => (
											<span
												key={collaborator._id}
												className='bg-indigo-600/10 text-indigo-300 px-2 py-1 rounded-md text-sm'
											>
												{collaborator.fullname}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
						<span
							className={`text-xs px-3 py-1 rounded-full font-medium ${
								statusColors[project.status] || 'bg-gray-100 text-gray-600'
							}`}
						>
							{project.status}
						</span>
					</div>

					<div className='tasks-cards-container'>
						<TasksContainer
							tasks={tasks}
							loading={loading}
							onClick={handleTaskModal}
						/>
					</div>
				</div>
			)}

			{addTask && (
				<div className='task-container backdrop-blur-md absolute top-0 left-0 w-full md:flex justify-center items-center h-full z-30 bg-white/5'>
					<AddTaskModal
						onClose={handleCloseTask}
						getTasks={getTasks}
					/>
				</div>
			)}
		</>
	);
}

export default EditProject;
