import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function TermsOfServicePage() {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Terms of Service | FreelanceFlow';
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className='max-w-4xl mx-auto p-6 text-justify'>
			<Helmet>
				<title>Terms of Service | FreelanceFlow</title>
				<meta
					name='description'
					content='Review the Terms of Service for FreelanceFlow. Understand your rights and responsibilities as a user of our freelance productivity platform.'
				/>
				<meta
					name='keywords'
					content='FreelanceFlow, Terms of Service, Freelancing Platform, Task Management, Time Tracking, Budgeting, Invoicing, Productivity Tools'
				/>
				<meta
					name='robots'
					content='index, follow'
				/>
				<meta
					property='og:title'
					content='Terms of Service | FreelanceFlow'
				/>
				<meta
					property='og:description'
					content='Review the Terms of Service for FreelanceFlow, covering user responsibilities, platform features, and legal guidelines.'
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content='https://freelancer-time-management-app.vercel.app/terms'
				/>
				<meta
					property='og:site_name'
					content='FreelanceFlow'
				/>
			</Helmet>

			<button
				onClick={() => navigate('/')}
				className='text-sm md:text-base mb-10 text-[var(--text-accent-color)] hover:text-[var(--text-color)] transition-all duration-200'
			>
				← Back
			</button>

			<h1 className='text-3xl font-bold mb-4 text-start'>Terms of Service for FreelanceFlow</h1>

			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				Effective Date: April 10, 2025
			</p>

			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				Welcome to FreelanceFlow! These Terms of Service (“Terms”) govern your access to and use of
				FreelanceFlow, a platform designed to support freelancers through features like Task
				Management, Time Blocking, Time Tracking, Client Management, Invoicing Assistance, and
				Budgeting Tools, along with optional features such as the Resource Library, Productivity
				Tips, and Notifications.
			</p>

			<h2 className='text-xl font-semibold mb-2'>1. Acceptance of Terms</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				By using FreelanceFlow, you agree to be bound by these Terms. If you do not agree, please do
				not use the Service.
			</p>

			<h2 className='text-xl font-semibold mb-2'>2. Eligibility</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				To use FreelanceFlow, you must be at least 18 years old or the age of legal majority in your
				jurisdiction.
			</p>

			<h2 className='text-xl font-semibold mb-2'>3. Account Registration</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				You agree to provide accurate, current information and maintain the confidentiality of your
				login credentials. You are responsible for all activity under your account.
			</p>

			<h2 className='text-xl font-semibold mb-2'>4. Use of Services</h2>
			<p className='mb-2 text-[var(--text-accent-color)] text-sm md:text-base'>
				FreelanceFlow offers the following:
			</p>
			<ul className='list-disc list-inside mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				<li>Task Management & Time Blocking to plan and structure your workflow.</li>
				<li>Time Tracker to monitor your work sessions and productivity.</li>
				<li>Client Manager to help you keep track of contacts and project details.</li>
				<li>Invoicing Assistance to generate, store, and manage invoices.</li>
				<li>Budgeting Tools to track and plan your freelance finances.</li>
				<li>
					Optional Features: Users can opt in to access a Resource Library, receive Productivity
					Tips, and enable Notifications for reminders and updates.
				</li>
			</ul>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				Misuse of the Services (e.g., hacking, reverse engineering, spamming) is strictly
				prohibited.
			</p>

			<h2 className='text-xl font-semibold mb-2'>5. Intellectual Property</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				All platform content, design, and tools are the intellectual property of FreelanceFlow.
				Users may not duplicate or redistribute any part without permission.
			</p>

			<h2 className='text-xl font-semibold mb-2'>6. Termination</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				We may suspend or terminate access to FreelanceFlow at any time for violating these Terms or
				engaging in behavior that harms the platform or other users.
			</p>

			<h2 className='text-xl font-semibold mb-2'>7. Modifications</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				FreelanceFlow may update these Terms periodically. Users will be notified of significant
				changes, and continued use implies acceptance.
			</p>

			<h2 className='text-xl font-semibold mb-2'>8. Disclaimer of Warranties</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				The platform is provided “as is.” We make no warranties, express or implied, regarding the
				availability, accuracy, or reliability of the Services.
			</p>

			<h2 className='text-xl font-semibold mb-2'>9. Limitation of Liability</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				FreelanceFlow is not liable for any indirect or consequential damages arising from your use
				of the platform or its features.
			</p>

			<h2 className='text-xl font-semibold mb-2'>10. Governing Law</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				These Terms are governed by the laws of Philippines. Disputes will be handled in accordance
				with applicable local laws.
			</p>
		</div>
	);
}

export default TermsOfServicePage;
