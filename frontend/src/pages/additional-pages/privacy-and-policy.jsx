import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function PrivacyPolicyPage() {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Privacy Policy | FreelanceFlow';
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className='max-w-4xl mx-auto p-6 text-justify'>
			<Helmet>
				<title>Privacy Policy | FreelanceFlow</title>
				<meta
					name='description'
					content='Read the Privacy Policy of FreelanceFlow to understand how we handle your personal data, usage information, and more.'
				/>
				<meta
					name='keywords'
					content='FreelanceFlow, Privacy Policy, Data Protection, Personal Information, Freelance Tools, User Privacy'
				/>
				<meta
					name='robots'
					content='index, follow'
				/>
				<meta
					property='og:title'
					content='Privacy Policy | FreelanceFlow'
				/>
				<meta
					property='og:description'
					content='Understand how FreelanceFlow collects, uses, and secures your data while using our freelance productivity platform.'
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content='https://freelancer-time-management-app.vercel.app/privacy'
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

			<h1 className='text-3xl font-bold mb-4 text-start'>Privacy Policy for FreelanceFlow</h1>

			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				Effective Date: April 10, 2025
			</p>

			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				This Privacy Policy explains how FreelanceFlow collects, uses, and protects your personal
				information while using the platform and its features.
			</p>

			<h2 className='text-xl font-semibold mb-2'>1. Information We Collect</h2>
			<ul className='list-disc list-inside mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				<li>
					<strong>Account Information:</strong> Such as name and email address.
				</li>
				<li>
					<strong>Usage Information:</strong> Data about how you interact with features like Task
					Management, Time Tracking, Invoicing, and Budgeting.
				</li>
				<li>
					<strong>Optional Data:</strong> If you enable Productivity Tips or Notifications, we may
					collect usage patterns to personalize these features.
				</li>
			</ul>

			<h2 className='text-xl font-semibold mb-2'>2. How We Use Your Information</h2>
			<p className='mb-2 text-[var(--text-accent-color)] text-sm md:text-base'>
				We use your information to:
			</p>
			<ul className='list-disc list-inside mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				<li>Provide and improve the platform’s core services.</li>
				<li>Offer personalized content and insights, such as Productivity Tips.</li>
				<li>Maintain your saved tasks, invoices, clients, and preferences.</li>
				<li>Notify you about important updates or reminders (if Notifications are enabled).</li>
			</ul>

			<h2 className='text-xl font-semibold mb-2'>3. Data Sharing</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				We do not sell your data. We only share data with trusted service providers (e.g., cloud
				storage or analytics tools) strictly to operate and improve FreelanceFlow.
			</p>

			<h2 className='text-xl font-semibold mb-2'>4. Cookies and Tracking</h2>
			<p className='mb-2 text-[var(--text-accent-color)] text-sm md:text-base'>
				FreelanceFlow may use cookies to:
			</p>
			<ul className='list-disc list-inside mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				<li>Save your preferences.</li>
				<li>Analyze platform usage for improvements.</li>
			</ul>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				You can disable cookies in your browser settings.
			</p>

			<h2 className='text-xl font-semibold mb-2'>5. Data Security</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				We use encryption, secure storage, and access controls to protect your data. While we follow
				industry standards, no platform can guarantee absolute security.
			</p>

			<h2 className='text-xl font-semibold mb-2'>6. Your Rights</h2>
			<ul className='list-disc list-inside mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				<li>Access and update your data.</li>
				<li>Delete your account and associated data.</li>
				<li>Opt out of optional features at any time.</li>
			</ul>

			<h2 className='text-xl font-semibold mb-2'>7. Children’s Privacy</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				FreelanceFlow is not intended for children under 18. We do not knowingly collect data from
				minors.
			</p>

			<h2 className='text-xl font-semibold mb-2'>8. Policy Updates</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				We may update this Privacy Policy occasionally. Users will be informed of significant
				changes via email or platform notification.
			</p>

			<h2 className='text-xl font-semibold mb-2'>9. Contact Us</h2>
			<p className='mb-4 text-[var(--text-accent-color)] text-sm md:text-base'>
				If you have questions or concerns, please contact us at{' '}
				<a
					href='mailto:privacy@freelanceflow.com'
					className='underline text-[var(--text-color)] hover:text-[var(--text-accent-color)]'
				>
					privacy@freelanceflow.com
				</a>
				.
			</p>
		</div>
	);
}

export default PrivacyPolicyPage;
