import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const handleAddModal = () => {
	console.log('Add Clicked!');
};

const handleEditModal = () => {
	console.log('Add Edit!');
};

const handleConfirmationModal = () => {
	console.log('Confirmed!');
};

export const ProjectsNav = {
	addProject: {
		title: 'Add Project',
		icon: <Plus />,
		onClick: handleAddModal(),
	},
	editProject: {
		title: 'Edit Project',
		icon: <Pencil />,
		onClick: handleEditModal(),
	},
	archiveProject: {
		title: 'Archive Project',
		icon: <Trash2 />,
		onClick: () => handleConfirmationModal(),
	},
};
