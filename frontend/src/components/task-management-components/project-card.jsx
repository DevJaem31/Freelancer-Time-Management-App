import React from 'react';
import { statusColors } from '../../utils/data/status';

function ProjectCard({ onClick, title, client, dueDate, description, status }) {
	return (
		<div
			onClick={onClick}
			className='card-component-container bg-[var(--card-accent-color)] rounded-lg p-4 flex-col justify-between cursor-pointer hover:shadow-md shadow-blue-100/10 md:min-h-[15rem]'
		>
			<div className='card-header flex flex-row justify-between mb-3 pb-1 border-b-1 border-b-blue-950'>
				<div className='flex flex-col items-start'>
					<h2 className='font-semibold leading-5  text-lg md:text-xl tracking-wider'>{title}</h2>
					<p className='text-xs md:text-sm text-gray-500'>Client: {client}</p>
				</div>

				<p className='md:text-sm text-xs mt-1 text-gray-200'>{dueDate}</p>
			</div>

			<div className='description-container md:min-h-[8rem] xl:max-h-[8rem]'>
				<p className='description-text text-xs md:text-sm text-justify '>{description}</p>
			</div>

			<div
				className={`items-end justify-self-end status-container rounded-2xl text-xs md:text-sm border w-fit px-3 py-1 md:py-0 mt-2 ${
					statusColors[status] || 'bg-gray-100 text-gray-600'
				}`}
			>
				{status}
			</div>
		</div>
	);
}

export default ProjectCard;
