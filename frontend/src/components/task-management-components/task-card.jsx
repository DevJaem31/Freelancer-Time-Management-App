import React from 'react';
import { statusColors } from '../../utils/data/status';

function TaskCard({ onClick, title, assignedTo, dueDate, description, status, priority }) {
	return (
		<div
			className='card-component-container relative bg-[var(--card-accent-color)] rounded-lg p-4 flex-col justify-between cursor-pointer hover:shadow-md shadow-blue-100/10 md:min-h-[15rem]'
			onClick={onClick}
		>
			<div className='card-header flex flex-row justify-between mb-3 pb-1 border-b-1 border-b-blue-950'>
				<div className='flex flex-col  md:w-fit w-[70%] items-start'>
					<h2 className='font-semibold leading-4.5 text-lg md:text-xl tracking-wider'>{title}</h2>
					<p className='text-xs md:text-sm text-gray-500'>Assigned To: {assignedTo}</p>
				</div>
				<p className='md:text-sm text-xs mt-1 text-gray-200'>{dueDate}</p>
			</div>

			<div className='description-container md:min-h-[8rem] xl:max-h-[8rem]'>
				<p className='description-text text-xs md:text-sm text-justify '>{description}</p>
			</div>

			<div className='bottom-container md:absolute bottom-4.5 right-3.5 items-end justify-self-end flex flex-row gap-5 status-container '>
				<div
					className={`rounded-2xl text-xs md:text-sm border w-fit px-3 py-1 md:py-0 mt-2 ${
						statusColors[status] || 'bg-gray-100 text-gray-600'
					}`}
				>
					{status}
				</div>

				<div className='rounded-2xl text-xs md:text-sm border w-fit px-3 py-1 md:py-0 mt-2'>
					{priority}
				</div>
			</div>
		</div>
	);
}

export default TaskCard;
