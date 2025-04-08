import React from 'react';
import './landing-page.css';

import HeroComponent from '../../components/hero-component/hero-component.jsx';

function LandingPage() {
	return (
		<div className='landing-page-container scroll-smooth h-fit flex flex-col'>
			<div className='landing-page-hero-component-container'>
				<HeroComponent />
			</div>
		</div>
	);
}

export default LandingPage;
