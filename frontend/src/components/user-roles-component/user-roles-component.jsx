import React, { useRef } from 'react';
import './user-roles-component.css';
import { company, freelancer } from '../../assets/icons/icons';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

function UserRolesComponent() {
	// Refs for the container and role items
	const containerRef = useRef(null);
	const roleRef1 = useRef(null);
	const roleRef2 = useRef(null);

	// Use the custom hook to track visibility of the container
	const isVisible = useIntersectionObserver(containerRef);

	return (
		<div
			ref={containerRef}
			className='user-roles-component-container flex flex-col justify-center items-center mb-20 mx-auto'
		>
			<header className='user-roles-component-header flex flex-col justify-center items-center mb-12'>
				<h1 className='user-role-header-text text-2xl md:text-4xl text-white font-extrabold mb-4 mt-4 tracking-wide'>
					User Roles
				</h1>
			</header>

			<div className='roles-container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full justify-center items-center px-4 md:px-0'>
				<div
					ref={roleRef1}
					className={`roles-item flex flex-col w-full max-w-md justify-center items-center bg-[var(--card-accent-color)] rounded-lg p-6 md:p-8 shadow-lg transition-transform transform hover:scale-105 ${
						isVisible ? 'flip-in' : ''
					}`}
				>
					<img
						src={company}
						alt='Client'
						className='role-icon h-[64px] mb-3'
					/>
					<h2 className='role-title mb-4 font-bold tracking-wider text-xl md:text-2xl'>Client</h2>
					<p className='role-description text-center text-[var(--text-accent-color)] text-sm md:text-base'>
						Limited access to view invoices and project timelines.
					</p>
				</div>

				<div
					ref={roleRef2}
					className={`roles-item flex flex-col w-full max-w-md justify-center items-center bg-[var(--card-accent-color)] rounded-lg p-6 md:p-8 shadow-lg transition-transform transform hover:scale-105 ${
						isVisible ? 'flip-in' : ''
					}`}
				>
					<img
						src={freelancer}
						alt='Freelancer'
						className='role-icon h-[64px] mb-3'
					/>
					<h2 className='role-title mb-4 font-bold tracking-wider text-xl md:text-2xl'>
						Freelancer
					</h2>
					<p className='role-description text-center text-[var(--text-accent-color)] text-sm md:text-base'>
						Full access to all features including task management, time tracking, invoicing, and
						more.
					</p>
				</div>
			</div>
		</div>
	);
}

export default UserRolesComponent;
