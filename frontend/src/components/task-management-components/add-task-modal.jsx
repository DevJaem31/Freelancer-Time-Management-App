import React, { useEffect, useState } from 'react';
import { CircleX } from 'lucide-react';
import FormComponent from '../reusable-components/form-component';
import { fetchAllUsers } from '../../services/user-services';
import { useParams } from 'react-router-dom';
import { addTask } from '../../services/task-services';
import toast from 'react-hot-toast';

function AddTaskModal({ onClose, getTasks, project }) {
	const { id } = useParams();
	const [users, setUsers] = useState([]);
	const [taskData, setTaskData] = useState({
		title: '',
		description: '',
		dueDate: '',
		assignedTo: '',
		tags: [],
		priority: 'Low',
		status: 'Not Started',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTaskData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const filterUsersByRole = (users, role) => {
		if (!Array.isArray(users)) return [];
		return users.filter((user) => user.role === role);
	};

	useEffect(() => {
		if (!project) return;

		const getUsers = async () => {
			try {
				const allUsers = await fetchAllUsers();
				const freelancers = filterUsersByRole(allUsers, 'freelancer');

				const projectCollaborators = project.collaborators.map((c) => c._id || c);
				const collaboratorsOnly = freelancers.filter((user) =>
					projectCollaborators.includes(user._id),
				);

				setUsers(collaboratorsOnly);
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};
		getUsers();
	}, [project]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formattedTaskData = {
				...taskData,
				dueDate: new Date(taskData.dueDate),
				tags: taskData.tags
					.split(',')
					.map((tag) => tag.trim())
					.filter(Boolean),
				startedAt: taskData.startedAt ? new Date(taskData.startedAt) : null,
				completedAt: taskData.completedAt ? new Date(taskData.completedAt) : null,
				assignedTo: taskData.assignedTo || null,
			};

			if (!taskData.title) {
				toast.error('Title is required');
				return;
			}

			const createdTask = await addTask(id, formattedTaskData);
			if (createdTask) {
				getTasks();
				toast.success('Task Created!');
				onClose();
			} else {
				toast.error('Failed to create task.');
			}
		} catch (error) {
			toast.error('An error occurred while creating the task.');
			console.error('Error:', error);
		}
	};

	return (
		<div className='add-task-modal-container md:w-[50%] md:h-[80%] m-auto h-screen w-screen bg-[var(--background-color)] shadow-2xl rounded-lg p-2 md:p-6'>
			<div className='header-add-modal flex flex-row gap-3 mb-5 items-center'>
				<button
					className='text-white hover:text-blue-200 cursor-pointer'
					onClick={onClose}
				>
					<CircleX size={32} />
				</button>

				<h2 className='md:text-2xl font-bold'>Add Task</h2>
			</div>

			<div className='form-container'>
				<form onSubmit={handleSubmit}>
					<FormComponent
						label='Title:'
						type='text'
						placeholder='Enter task title...'
						name='title'
						value={taskData.title}
						onChange={handleChange}
					/>

					<FormComponent
						label='Description:'
						type='textarea'
						placeholder='Optional description...'
						name='description'
						value={taskData.description}
						onChange={handleChange}
					/>

					<div className='md:flex md:flex-row md:gap-5 md:items-center'>
						<FormComponent
							label='Due Date:'
							type='date'
							name='dueDate'
							value={taskData.dueDate}
							onChange={handleChange}
							min={new Date().toISOString().split('T')[0]}
						/>

						<FormComponent
							label='Assigned To (optional):'
							type='select'
							name='assignedTo'
							value={taskData.assignedTo}
							onChange={handleChange}
							options={[
								...users.map((user) => ({
									label: user.fullname,
									value: user._id,
								})),
							]}
						/>
					</div>

					<FormComponent
						label='Tags (comma-separated):'
						type='text'
						name='tags'
						placeholder='e.g. frontend, bug, urgent'
						value={taskData.tags}
						onChange={handleChange}
					/>

					<div className='md:flex md:flex-row md:gap-5 md:items-center'>
						<FormComponent
							label='Priority:'
							type='select'
							name='priority'
							value={taskData.priority}
							onChange={handleChange}
							options={[
								{ label: 'Low', value: 'Low' },
								{ label: 'Medium', value: 'Medium' },
								{ label: 'High', value: 'High' },
								{ label: 'Urgent', value: 'Urgent' },
							]}
						/>

						<FormComponent
							label='Status:'
							type='select'
							name='status'
							value={taskData.status}
							onChange={handleChange}
							options={[
								{ label: 'Not Started', value: 'Not Started' },
								{ label: 'In Progress', value: 'In Progress' },
								{ label: 'Completed', value: 'Completed' },
								{ label: 'On Hold', value: 'On Hold' },
							]}
						/>
					</div>

					<button
						type='submit'
						className='bg-white/80 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-250 ease-in-out w-full md:py-3 py-2 cursor-pointer mt-2 rounded-lg md:text-lg text-base'
					>
						Create Task
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddTaskModal;
