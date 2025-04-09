import React from 'react';
import './features-component.css';
import {
	budgeting,
	clientManagement,
	invoicing,
	taskManagement,
	timeBlocking,
	timeTracker,
} from '../../../assets/icons/icons';
import FeaturesCard from '../../reusable-components/features-card';

function FeaturesComponent() {
	return (
		<div className='features-component-container flex flex-col justify-center items-center mb-20 py-15 mx-auto w-[100%] bg-[var(--card-accent-color)]'>
			<header className='features-component-header flex flex-col justify-center items-center mb-12'>
				<h1 className='features-header-text text-2xl md:text-4xl text-white font-extrabold mb-1 mt-4 tracking-wide'>
					Features
				</h1>
				<p className='features-sub-text text-center text-[var(--text-accent-color)] text-sm md:text-base'>
					Explore the powerful features designed to streamline your freelance workflow.
				</p>
			</header>

			<div className='features-item-container grid grid-cols-1 md:grid-cols-3 gap-5 p-4'>
				<FeaturesCard
					icon={taskManagement}
					title='Task Management'
					description='Projects → Tasks → Subtasks, tags, deadlines.'
				/>
				<FeaturesCard
					icon={timeBlocking}
					title='Time Blocking'
					description='Drag-drop calendar, Google Calendar sync.'
				/>
				<FeaturesCard
					icon={timeTracker}
					title='Time Tracker'
					description='Pomodoro/manual, task/project based.'
				/>
				<FeaturesCard
					icon={clientManagement}
					title='Client Manager'
					description='Contact info, linked projects.'
				/>
				<FeaturesCard
					icon={invoicing}
					title='Invoicing'
					description='Auto-generate from logs, export to PDF/email.'
				/>
				<FeaturesCard
					icon={budgeting}
					title='Budgeting'
					description='Income tracking, savings goals, expenses.'
				/>
			</div>
		</div>
	);
}

export default FeaturesComponent;
