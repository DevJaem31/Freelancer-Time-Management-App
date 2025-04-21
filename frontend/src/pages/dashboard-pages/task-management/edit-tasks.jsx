import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchTasksbyID } from '../../../services/task-services';
import { useParams } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react';

function EditTasks() {
	const [task, setTask] = useState([]);
	const [loading, setLoading] = useState(false);
	const { taskID } = useParams();

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

	return (
		<>
			{loading ? (
				<div className='loading flex justify-center items-center min-h-40 h-screen'>
					<div className='relative w-10 h-10'>
						<div className='absolute inset-0 rounded-full border-4 border-t-transparent border-indigo-500 animate-spin' />
					</div>
				</div>
			) : (
				<>
					<div className='header-container-tasks'>
						<div className='header-left'>
							<button className='cursor-pointer hover:opacity-50 duration-275'>
								<CircleArrowLeft size={30} />
							</button>
							<div className='title-header-left'>
								<h1>{task.title}</h1>
								<p className='owner-header-left'>{task.assignedTo.fullname}</p>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default EditTasks;
