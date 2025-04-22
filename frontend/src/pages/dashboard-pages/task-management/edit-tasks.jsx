import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchTasksbyID } from '../../../services/task-services';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react';

function EditTasks() {
	const [task, setTask] = useState([]);
	const [loading, setLoading] = useState(false);
	const { taskID } = useParams();
	const navigate = useNavigate();

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
					<div className='header-container-tasks'>
						<div className='header-left flex flex-row gap-4 items-center'>
							<button
								className='cursor-pointer hover:opacity-50 mt-[-.7rem] duration-275'
								onClick={handleBack}
							>
								<CircleArrowLeft size={30} />
							</button>
							<div className='title-header-left'>
								<h1 className='m-0 p-0 font-black tracking-wider text-base md:text-lg xl:text-3xl leading-4 md:leading-5 xl:leading-6'>
									{task.title}
								</h1>
								<p className='owner-header-left text-gray-500 md:text-base xl:text-lg text-sm '>
									{task.assignedTo?.fullname}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default EditTasks;
