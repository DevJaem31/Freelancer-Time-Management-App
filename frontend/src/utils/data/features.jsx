import {
	budgeting,
	clientManagement,
	invoicing,
	taskManagement,
	timeBlocking,
	timeTracker,
} from '../../assets/icons/icons';

const features = [
	{
		icon: taskManagement,
		title: 'Task Management',
		description: 'Projects → Tasks → Subtasks, tags, deadlines.',
	},
	{
		icon: timeBlocking,
		title: 'Time Blocking',
		description: 'Drag-drop calendar, Google Calendar sync.',
	},
	{
		icon: timeTracker,
		title: 'Time Tracker',
		description: 'Pomodoro/manual, task/project based.',
	},
	{
		icon: clientManagement,
		title: 'Client Manager',
		description: 'Contact info, linked projects.',
	},
	{
		icon: invoicing,
		title: 'Invoicing',
		description: 'Auto-generate from logs, export to PDF/email.',
	},
	{
		icon: budgeting,
		title: 'Budgeting',
		description: 'Income tracking, savings goals, expenses.',
	},
];

export { features };
