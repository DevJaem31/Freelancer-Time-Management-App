import React from 'react';

function FooterComponent() {
	return (
		<div className='footer-component'>
			<div className='footer-component-content'>
				<div className='footer-component-content-text mb-2'>
					<p className='text-center text-xs md:text-xs lg:text-base text-[var(--text-accent-color)]'>
						© 2023 Freelancer Time Management App. All rights reserved.
					</p>
				</div>
				<div className='footer-component-content-links flex justify-center items-center gap-4'>
					<a
						href='#'
						className='text-[var(--text-accent-color)] hover:text-[var(--text-color)] transition-all duration-250 ease-in-out text-xs md:text-xs lg:text-base'
					>
						Privacy Policy
					</a>
					<a
						href='#'
						className='text-[var(--text-accent-color)] hover:text-[var(--text-color)] transition-all duration-250 ease-in-out text-xs md:text-xs lg:text-base'
					>
						Terms of Service
					</a>
				</div>
			</div>
		</div>
	);
}

export default FooterComponent;
