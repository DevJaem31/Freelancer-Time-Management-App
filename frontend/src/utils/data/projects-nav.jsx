import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export const ProjectsNav = ({ handleAddModal, handleEditModal, handleConfirmationModal }) => ({
	addProject: {
		title: 'Add Project',
		icon: <Plus />,
		onClick: handleAddModal,
	},
	editProject: {
		title: 'Edit Project',
		icon: <Pencil />,
		onClick: handleEditModal,
	},
	archiveProject: {
		title: 'Archive Project',
		icon: <Trash2 />,
		onClick: handleConfirmationModal,
	},
});
