import React from 'react';

function ConfirmationModal({ onArchive, onClose }) {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
			<div className='relative bg-[var(--background-color)] text-white rounded-lg shadow-xl p-6 w-[25%] confirmation-modal-container'>
				<div className='confirmation-message flex items-center justify-center flex-col'>
					<h2 className='text-2xl font-bold mb-4 text-blue-400'>Are you sure?</h2>
					<p className='text-gray-300'>Do you want to delete this task?</p>

					<div className='button-containers flex items-center justify-between w-[45%] mt-10'>
						<button
							onClick={onClose}
							className='text-gray-400 bg-gray-600 rounded px-3 py-1 hover:text-gray-200 hover:bg-gray-600/80 cursor-pointer transition duration-200'
						>
							Cancel
						</button>

						<button
							onClick={onArchive}
							className='text-white bg-red-500 rounded px-3 py-1 hover:text-gray-200 hover:bg-red-600/80 cursor-pointer transition duration-200'
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConfirmationModal;
