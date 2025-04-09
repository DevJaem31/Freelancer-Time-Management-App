import React from 'react';

function FeaturesCard({ icon, title, description }) {
	return (
		<div className='feature-card-container flex flex-col justify-center items-center bg-[var(--card-background-color)] rounded-lg p-6 md:p-8 shadow-lg transition-transform transform hover:scale-105'>
			<img
				src={icon}
				alt={title}
				className='feature-icon h-[45px] mb-3'
			/>
			<h2 className='feature-title mb-1 font-bold tracking-wider text-lg md:text-xl'>{title}</h2>
			<p className='feature-description text-center text-[var(--text-accent-color)] text-xs md:text-sm'>
				{description}
			</p>
		</div>
	);
}

export default FeaturesCard;
