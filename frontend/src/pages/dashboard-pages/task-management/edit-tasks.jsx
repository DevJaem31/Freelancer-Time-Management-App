import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchTasksbyID } from '../../../services/task-services';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleArrowLeft, Pencil, Trash2, Save } from 'lucide-react';

function EditTasks() {
	const [task, setTask] = useState([]);
	const [loading, setLoading] = useState(false);
	const { taskID } = useParams();
	const navigate = useNavigate();

	const [editState, setEditState] = useState(false);

	const fetchTaskDetails = async () => {
		setLoading(true);
		try {
			const response = await fetchTasksbyID(taskID);

			setTask(response);
			setLoading(false);
		} catch {
			toast.error('Failed to Fetch Tasks Detail of ', taskID);
		}
	};

	useEffect(() => {
		fetchTaskDetails();
	}, [taskID]);

	const handleBack = () => {
		navigate(-1);
	};

	const handleEditState = () => {
		setEditState((prev) => !prev);
	};

	const handleSave = () => {};

	const handleArchiveProject = () => {};

	return (
		<>
			{loading ? (
				<div className='loading flex justify-center items-center min-h-40 h-screen'>
					<div className='relative w-10 h-10'>
						<div className='absolute inset-0 rounded-full border-4 border-t-transparent border-indigo-500 animate-spin' />
					</div>
				</div>
			) : (
				<div className='w-[50%] mx-auto'>
					<div className='header-container-tasks flex flex-row items center gap-2 md:text-lg justify-between'>
						<div className='header-left flex flex-row gap-4 items-center'>
							<button
								className='cursor-pointer hover:opacity-50 duration-275'
								onClick={handleBack}
							>
								<CircleArrowLeft size={30} />
							</button>

							<div className='header_text'>
								<h1 className='task-title-text m-0 p-0 font-black tracking-wider text-base md:text-lg xl:text-3xl leading-4 md:leading-5 xl:leading-6'>
									Edit Task
								</h1>
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

					<div className='task-edit-content px-11 mt-10'>
						<div className='task-content-header flex items-start justify-between'>
							<div className='left-side'>
								<h1 className='xl:text-2xl xl:font-black text-blue-500'>{task?.title}</h1>
								<p className='xl:text-lg xl:font-semibold'>{task.assignedTo?.fullname}</p>
							</div>

							<div className='right-side'>
								<p className='xl:text-base xl:font-semibold text-gray-600'>
									{new Date(task?.dueDate).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							</div>
						</div>

						<div className='task-content-main'>
							<p className=''>{task?.description}</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default EditTasks;
