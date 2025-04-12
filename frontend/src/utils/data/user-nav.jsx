import React from 'react';
import { ClipboardList, Calendar, Timer, Users, DollarSign, Clock } from 'lucide-react';

const UserNav = {
	freelancerSections: [
		{ icon: <ClipboardList />, title: 'Task Management', route: '/dashboard/tasks-manager' },
		{ icon: <Calendar />, title: 'Time Blocking', route: '/calendar' },
		{ icon: <Timer />, title: 'Time Tracker', route: '/tracker' },
		{ icon: <Users />, title: 'Client Manager', route: '/clients' },
		{ icon: <DollarSign />, title: 'Invoicing', route: '/invoices' },
		{ icon: <DollarSign />, title: 'Budgeting', route: '/budget' },
	],

	clientSections: [
		{ icon: <Clock />, title: 'Project Timeline', route: '/timeline' },
		{ icon: <DollarSign />, title: 'Invoices', route: '/invoices' },
	],
};

export { UserNav };
