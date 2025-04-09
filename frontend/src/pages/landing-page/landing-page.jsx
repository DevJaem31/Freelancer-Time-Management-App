import React from 'react';
import './landing-page.css';

import UserRolesComponent from '../../components/landing-page-components/user-roles-component/user-roles-component.jsx';
import FeaturesComponent from '../../components/landing-page-components/features-component/features-component.jsx';
import HeroComponent from '../../components/landing-page-components/hero-component/hero-component.jsx';

function LandingPage() {
	return (
		<div className='landing-page-container scroll-smooth h-fit flex flex-col gap-10'>
			<div className='landing-page-hero-component-container'>
				<HeroComponent />
			</div>

			<section
				className='landing-page-section h-fit flex flex-col justify-center items-center'
				id='learn-more-section'
			>
				<div className='user-roles-landing-container '>
					<UserRolesComponent />
				</div>

				<div className='features-landing-container w-[100%]'>
					<FeaturesComponent />
				</div>
			</section>
		</div>
	);
}

export default LandingPage;
