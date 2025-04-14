import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutAccount } from '../../services/user-services';

function SettingModal() {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logoutAccount();

			navigate('/');
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	return (
		<div className='bg-[var(--card-accent-color)] p-6 rounded-lg shadow-2xl w-[15rem] absolute top-15 right-15 md:right-43'>
			<h2 className='text-xl font-semibold mb-4 text-white border-b-1'>Settings</h2>

			<div className='mb-3'>
				<button className='btn btn-lg w-full text-start text-base cursor-pointer hover:text-gray-400  transition-all duration-250 ease-out text-white'>
					Profile Settings
				</button>
			</div>

			<div className='mb-3'>
				<button className='btn btn-lg w-full text-start text-base cursor-pointer hover:text-gray-400  transition-all duration-250 ease-out text-white'>
					Website Settings
				</button>
			</div>

			<div className='mb-3'>
				<button
					onClick={handleLogout}
					className='btn btn-lg flex items-center gap-4 hover:text-red-500 cursor-pointer transition-all duration-250 ease-out btn-danger text-start text-base w-full text-red-400'
				>
					Log Out
					<LogOut size={20} />
				</button>
			</div>
		</div>
	);
}

export default SettingModal;
