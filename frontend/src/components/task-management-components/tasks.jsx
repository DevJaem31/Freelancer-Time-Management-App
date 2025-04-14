import React from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './task-card';

function TasksContainer({ tasks, onClick, loading }) {
	return (
		<div className='task-container w-[92.5%] m-auto border-t-1 border-blue-950 pt-5'>
			<div className='header-task-container flex flex-row items-center mb-2 justify-between'>
				<h1 className='tasks-header-text text-2xl font-black'>TASKS</h1>
				<button
					onClick={onClick}
					className='bg-blue-300 px-3 py-1 hover:bg-blue-500 transition-all duration-250 ease-out cursor-pointer flex items-center gap-2 rounded-3xl'
				>
					<Plus size={20} /> Add Task
				</button>
			</div>

			<div className='tasks-list-container w-full overflow-scroll h-[26.5rem] md:gap-y-4 flex flex-col md:grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 col-span-4 gap-2 col-start-1'>
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
				) : tasks.length > 0 ? (
					tasks.map((task) => (
						<div key={task._id}>
							<TaskCard
								title={task.title}
								assignedTo={task.assignedTo.fullname}
								dueDate={new Date(task.dueDate).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
								description={task.description}
								status={task.status}
								priority={task.priority}
							/>
						</div>
					))
				) : (
					<div className='no-project-container col-span-full flex justify-center items-center text-center text-gray-400'>
						<h1>No Task in the Project Available.</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export default TasksContainer;
