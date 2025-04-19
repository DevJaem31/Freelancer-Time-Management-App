import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CircleX } from 'lucide-react';
import { fetchAllUsers } from '../../services/user-services';
import FormComponent from '../reusable-components/form-component';
import { createProject } from '../../services/project-services';

function AddProjectModal({ onClose, onRefresh }) {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		client: '',
		dueDate: '',
		collaborators: [],
		status: 'Not Started',
	});

	const [clients, setClients] = useState([]);
	const [users, setUsers] = useState([]);

	const filterUsersByRole = (users, role) => {
		if (!Array.isArray(users)) return [];
		return users.filter((user) => user.role === role);
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createProject(formData);

			toast.success('Project Created!');
			onRefresh();
			onClose();
		} catch (error) {
			toast.error('Failed to create account, please try again.');
			throw error;
		}
	};

	return (
		<div className='md:w-[50%] md:h-[80%] h-screen w-screen bg-[var(--background-color)] shadow-2xl rounded-lg p-2 md:p-6'>
			<div className='header-add-modal flex flex-row gap-3 mb-5 items-center md:pt-0 md:pb-0 pt-10 pb-10'>
				<button
					className='text-white hover:text-blue-200 cursor-pointer'
					onClick={onClose}
				>
					<CircleX size={32} />
				</button>

				<h2 className='md:text-2xl font-bold'>Add Project</h2>
			</div>

			<div className='form-container'>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col'
				>
					<FormComponent
						type='text'
						label='Project Title:'
						name='title'
						value={formData.title}
						onChange={handleInputChange}
						placeholder='e.g. "Task Manager"'
					/>

					<FormComponent
						type='textarea'
						label='Description:'
						name='description'
						value={formData.description}
						onChange={handleInputChange}
						placeholder='Write a short description of the project...'
					/>

					<FormComponent
						type='select'
						label='Client:'
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

					<div className='md:flex flex-row items-center gap-4'>
						<FormComponent
							type='date'
							label='Due Date:'
							value={formData.dueDate}
							name='dueDate'
							onChange={handleInputChange}
							min={new Date().toISOString().split('T')[0]}
						/>

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
					</div>

					<button
						className='bg-white/80 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-250 ease-in-out w-full md:py-3 py-2 cursor-pointer mt-2 rounded-lg md:text-lg text-base'
						type='submit'
					>
						Create Project
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddProjectModal;
