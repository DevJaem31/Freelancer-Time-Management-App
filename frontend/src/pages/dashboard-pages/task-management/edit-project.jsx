import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircleArrowLeft, Pencil, Trash2, Save } from 'lucide-react';
import { fetchAllUsers } from '../../../services/user-services';
import {
	fetchProjectID,
	editProjectbyID,
	archiveProject,
} from '../../../services/project-services';
import { fetchProjectTasks } from '../../../services/task-services';
import { statusColors } from '../../../utils/data/status';
import { toast } from 'react-hot-toast';

const AddTaskModal = React.lazy(() =>
	import('../../../components/task-management-components/add-task-modal'),
);
const ConfirmationModal = React.lazy(() =>
	import('../../../components/reusable-components/confirmation-modal'),
);
import TasksContainer from '../../../components/task-management-components/tasks';
import FormComponent from '../../../components/reusable-components/form-component';

function EditProject() {
	const [editState, setEditState] = useState(false);
	const [project, setProject] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [addTask, showAddTask] = useState(false);
	const [confirmation, showConfirmation] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		description: '',
		client: '',
		dueDate: '',
		collaborators: [],
		status: 'Not Started',
	});

	const getTasks = async () => {
		setLoading(true);
		try {
			if (!id) {
				toast.error('Failed to fetch the project ID');
			}

			const taskData = await fetchProjectTasks(id);

			const sortedTasks = [...taskData].sort((a, b) => {
				const dateA = new Date(a.dueDate);
				const dateB = new Date(b.dueDate);
				return dateA - dateB;
			});

			setTasks(sortedTasks);
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	const [clients, setClients] = useState([]);
	const [users, setUsers] = useState([]);

	const filterUsersByRole = (users, role) => {
		if (!Array.isArray(users)) return [];
		return users.filter((user) => user.role === role);
	};

	const handleArchiveProject = () => {
		showConfirmation(true);
	};

	useEffect(() => {
		const getUsers = async () => {
			try {
				const allUsers = await fetchAllUsers();

				const freelancers = filterUsersByRole(allUsers, 'freelancer');
				const clientsOnly = filterUsersByRole(allUsers, 'client');

				setUsers(freelancers);
				setClients(clientsOnly);
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};
		getUsers();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleMultiSelect = (e) => {
		const options = Array.from(e.target.selectedOptions, (option) => option.value);
		setFormData((prev) => ({
			...prev,
			collaborators: options,
		}));
	};

	const handleEditState = () => {
		setEditState((prev) => !prev);
	};

	const handleSave = async () => {
		try {
			setLoading(true);

			await editProjectbyID(id, formData);
			toast.success('Project updated successfully');
			fetchProject();
			setEditState(false);
		} catch (error) {
			if (error.response?.status === 403) {
				toast.error("You don't have permission to edit the project");
			} else {
				toast.error('Error saving the project');
			}
		} finally {
			setLoading(false);
		}
	};

	const fetchProject = async () => {
		setLoading(true);
		try {
			const projectData = await fetchProjectID(id);
			setProject(projectData);

			setFormData({
				title: projectData.title || '',
				description: projectData.description || '',
				client: projectData.client?._id || '',
				dueDate: projectData.dueDate || '',
				collaborators: projectData.collaborators?.map((c) => c._id) || [],
				status: projectData.status || 'Not Started',
			});
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

	useEffect(() => {
		fetchProject();
		getTasks();
	}, [id, navigate]);

	const handleTaskModal = () => {
		showAddTask(true);
	};

	const handleCloseTask = () => {
		showAddTask(false);
	};

	const handleCloseConfirmation = () => {
		showConfirmation(false);
	};

	const archiveTheProject = async () => {
		try {
			await archiveProject(id);

			navigate('/dashboard/projects-manager');
			showConfirmation(false);
			toast.success('Successfully Archived!');
		} catch (error) {
			if (error.response?.status === 403) {
				toast.error("You don't have permission to archive the project");
			} else {
				toast.error('Error archiving the project');
			}
		}
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
								<h1 className='text-header text-lg md:text-2xl font-bold leading-4.5 mb-1 md:leading-0 md:mb-0 tracking-wider'>
									{project.title}
								</h1>

								{editState ? (
									<>
										<p className='text-xs opacity-50 mt-[-0.3rem]'>Deadline: </p>
										<FormComponent
											type='date'
											value={formData.dueDate ? formData.dueDate.split('T')[0] : ''}
											name='dueDate'
											onChange={handleInputChange}
											min={new Date().toISOString().split('T')[0]}
										/>
									</>
								) : (
									<p className='text-xs opacity-50 mt-[-0.3rem]'>
										Deadline:{' '}
										{new Date(project.dueDate).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</p>
								)}
							</div>
						</div>

						<div className='right-side flex flex-row gap-5 items-center'>
							<button
								className='cursor-pointer'
								onClick={handleEditState}
								title='Edit Button'
							>
								<Pencil size={20} />
							</button>

							{editState && (
								<button
									onClick={handleSave}
									className='text-green-600 cursor-pointer'
									title='Save Button'
								>
									<Save size={20} />
								</button>
							)}

							<button
								onClick={handleArchiveProject}
								title='Archive Button'
								className='text-red-800 cursor-pointer text-shadow-red-950 shadow-lg'
							>
								<Trash2 size={20} />
							</button>
						</div>
					</div>

					<div className='main-content-container md:my-10 w-full my-5 flex flex-col items-start gap-3 md:mx-15'>
						<div className='project-details-container flex w-full md:w-[80%] flex-col gap-1'>
							<div className='section-container flex gap-1 md:gap-3'>
								<h2 className='label-content text-sm md:text-base xl:text-lg text-gray-500'>
									Client:{' '}
								</h2>
								{editState ? (
									<FormComponent
										type='select'
										value={formData.client}
										name='client'
										options={[
											...clients.map((client) => ({
												label: client.fullname,
												value: client._id,
											})),
										]}
										onChange={handleInputChange}
									/>
								) : (
									<p className='text-sm md:text-base xl:text-lg'>{project.client?.fullname}</p>
								)}
							</div>

							<div className='section-container flex gap-1 md:gap-3'>
								<h2 className='label-content text-gray-500 text-sm md:text-base xl:text-lg'>
									Project Head:{' '}
								</h2>
								<p className='text-sm md:text-base xl:text-lg'>{project.createdBy?.fullname}</p>
							</div>

							<div className='section-container flex md:flex-row flex-col md:gap-5 '>
								<h2 className='label-content text-sm md:text-base xl:text-lg text-gray-500'>
									Description:{' '}
								</h2>
								{editState ? (
									<FormComponent
										type='textarea'
										name='description'
										value={formData.description}
										onChange={handleInputChange}
										placeholder='Write a short description of the project...'
									/>
								) : (
									<p className='text-sm md:text-base xl:text-lg'>{project.description}</p>
								)}
							</div>

							{editState ? (
								<FormComponent
									multiple
									type='select'
									label='Collaborators:'
									value={formData.collaborators}
									name='collaborators'
									options={[
										...users.map((user) => ({
											label: user.fullname,
											value: user._id,
										})),
									]}
									onChange={handleMultiSelect}
								/>
							) : (
								<>
									{project?.collaborators && project.collaborators.length > 0 && (
										<div className='section-container flex md:flex-row flex-col md:gap-5 '>
											<h2 className='label-content text-sm md:text-base xl:text-lg text-gray-500'>
												Collaborators:
											</h2>
											<div className='flex flex-wrap gap-2'>
												{project.collaborators.map((collaborator) => (
													<span
														key={collaborator._id}
														className='bg-indigo-600/10 md:text-base xl:text-lg text-indigo-300 px-2 py-1 rounded-md text-sm'
													>
														{collaborator.fullname}
													</span>
												))}
											</div>
										</div>
									)}
								</>
							)}

							{editState ? (
								<FormComponent
									type='select'
									label='Status:'
									value={formData.status}
									name='status'
									options={[
										{ label: 'Not Started', value: 'Not Started' },
										{ label: 'In Progress', value: 'In Progress' },
										{ label: 'Completed', value: 'Completed' },
										{ label: 'On Hold', value: 'On Hold' },
									]}
									onChange={handleInputChange}
								/>
							) : (
								<span
									className={`text-xs px-3 md:text-base xl:text-lg py-1 rounded-full w-fit font-medium ${
										statusColors[project.status] || 'bg-gray-100 text-gray-600'
									}`}
								>
									{project.status}
								</span>
							)}
						</div>
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
						project={project}
					/>
				</div>
			)}

			{confirmation && (
				<ConfirmationModal
					onArchive={archiveTheProject}
					onClose={handleCloseConfirmation}
				/>
			)}
		</>
	);
}

export default EditProject;
