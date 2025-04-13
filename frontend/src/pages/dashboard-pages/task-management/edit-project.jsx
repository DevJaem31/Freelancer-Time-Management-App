import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircleArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { fetchProjectID } from '../../../services/project-services';
import { statusColors } from '../../../utils/data/status';
import { toast } from 'react-hot-toast';

function EditProject() {
	const [project, setProject] = useState([]);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProject = async () => {
			setLoading(true);
			try {
				const projectData = await fetchProjectID(id);

				setProject(projectData);
			} catch {
				toast.error('Project not found');
			} finally {
				setLoading(false);
			}
		};
		fetchProject();
	}, [id]);

	return (
		<>
			{loading ? (
				<div className='loading flex justify-center items-center min-h-40 h-screen'>
					<div className='relative w-10 h-10'>
						<div className='absolute inset-0 rounded-full border-4 border-t-transparent border-indigo-500 animate-spin' />
					</div>
				</div>
			) : (
				<div>
					<div className='header-container flex flex-row items center gap-2 md:text-lg justify-between'>
						<div className='left-side  flex flex-row items center gap-2'>
							<button
								onClick={() => navigate('/dashboard/projects-manager')}
								className='back-btn text-lg text-white hover:text-blue-200 cursor-pointer'
							>
								<CircleArrowLeft size={28} />
							</button>

							<div className='header-column'>
								<h1 className='text-header text-lg md:text-2xl font-bold tracking-wider'>
									{project.title}
								</h1>

								<p className='text-xs opacity-50 mt-[-0.3rem]'>
									Deadline:{' '}
									{new Date(project.dueDate).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							</div>
						</div>

						<div className='right-side flex flex-row gap-5 items-center'>
							<button>
								<Pencil size={20} />
							</button>
							<button>
								<Trash2 size={20} />
							</button>
						</div>
					</div>

					<div className='main-content-container md:my-10 my-5 md:mx-15'>
						<div className='section-container flex gap-5'>
							<h2 className='label-content'>Client: </h2>
							<p>{project.client?.fullname}</p>
						</div>

						<div className='section-container flex gap-5'>
							<h2 className='label-content'>Description: </h2>
							<p>{project.description}</p>
						</div>

						{project?.collaborators && project.collaborators.length > 0 && (
							<div className='section-container flex gap-5'>
								<h2 className='label-content'>Collaborators:</h2>
								<div className='flex flex-wrap gap-2'>
									{project.collaborators.map((collaborator) => (
										<span
											key={collaborator._id}
											className='bg-indigo-600/10 text-indigo-300 px-2 py-1 rounded-md text-sm'
										>
											{collaborator.fullname}
										</span>
									))}
								</div>
							</div>
						)}

						<span
							className={`text-xs px-3 py-1 rounded-full font-medium ${
								statusColors[project.status] || 'bg-gray-100 text-gray-600'
							}`}
						>
							{project.status}
						</span>
					</div>
				</div>
			)}
		</>
	);
}

export default EditProject;
