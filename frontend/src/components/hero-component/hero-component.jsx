import React from 'react';
import './hero-component.css';
import { background } from '../../assets/images/images.jsx';

function HeroComponent() {
	return (
		<div className='hero-component-container relative h-screen flex items-center justify-center text-center bg-gradient-to-r from-purple-500 to-indigo-500'>
			<img
				src={background}
				loading='lazy'
				alt='Background'
				className='hero-background-image absolute inset-0 w-full h-full object-cover opacity-30'
			/>
			<div className='z-10 px-6 md:px-12'>
				<h1 className='hero-header-text text-5xl md:text-6xl text-white font-extrabold mb-4'>
					Master Your Time as a Freelancer
				</h1>
				<p className='hero-sub-text text-xl text-white mb-8'>
					Stay on top of deadlines, track your time, and focus on what matters most to grow your
					freelance career.
				</p>
				<div className='hero-button-container flex flex-col items-center justify-center gap-5 py-3'>
					<a
						href=''
						className='learn-more-button bg-white text-purple-500 hover:bg-purple-500 w-fit hover:text-white hover:shadow-xl/10 px-6 py-3 rounded-full text-lg font-semibold transition duration-300 ease-in-out'
					>
						Get Started
					</a>
					<a
						href='#features'
						className='learn-more-button px-5 text-white w-fit hover:text-gray-200 hover:underline underline-offset-8 px-6 text-lg font-semibold transition-all duration-350 ease-in'
					>
						Learn More
					</a>
				</div>
			</div>
		</div>
	);
}

export default HeroComponent;
