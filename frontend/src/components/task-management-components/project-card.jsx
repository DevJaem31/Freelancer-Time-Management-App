import React from 'react';

function ProjectCard({ title, client, dueDate, description, status }) {
	return (
		<div className='card-component-container bg-[var(--card-accent-color)] rounded-lg p-4'>
			<div className='card-header flex flex-col md:flex-row justify-between mb-3 pb-1 border-b-1 border-b-blue-950'>
				<div className='flex flex-col items-start'>
					<h2 className='font-semibold text-xl tracking-wider'>{title}</h2>
					<p className='text-sm text-gray-500 '>{client}</p>
				</div>

				<p className='text-sm mt-1 text-gray-200'>{dueDate}</p>
			</div>

			<div className='description-container'>
				<p className='description-text text-sm text-justify'>{description}</p>
			</div>
			<div className='self-end justify-self-end status-container rounded-2xl text-sm border w-fit px-3 mt-2'>
				{status}
			</div>
		</div>
	);
}

export default ProjectCard;
