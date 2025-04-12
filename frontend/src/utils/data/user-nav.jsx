import React from 'react';
import { ClipboardList, Calendar, Timer, Users, DollarSign, Clock } from 'lucide-react';

const UserNav = {
	freelancerSections: [
		{ icon: <ClipboardList />, title: 'Project Management', route: '/dashboard/projects-manager' },
		{ icon: <Calendar />, title: 'Time Blocking', route: '/dashboard/calendar' },
		{ icon: <Timer />, title: 'Time Tracker', route: '/dashboard/tracker' },
		{ icon: <Users />, title: 'Client Manager', route: '/dashboard/clients' },
		{ icon: <DollarSign />, title: 'Invoicing', route: '/dashboard/invoices' },
		{ icon: <DollarSign />, title: 'Budgeting', route: '/dashboard/budget' },
	],

	clientSections: [
		{ icon: <Clock />, title: 'Project Timeline', route: '/dashboard/timeline' },
		{ icon: <DollarSign />, title: 'Invoices', route: '/dashboard/invoices' },
	],
};

export { UserNav };
