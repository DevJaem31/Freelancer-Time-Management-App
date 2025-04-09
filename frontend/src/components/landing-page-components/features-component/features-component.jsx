import React, { useRef } from 'react';
import './features-component.css';
import FeaturesCard from '../../reusable-components/features-card';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import { features } from '../../../utils/data/features';

function FeaturesComponent() {
	const containerRef = useRef(null);
	const isVisible = useIntersectionObserver(containerRef);

	return (
		<div
			className='features-component-container flex flex-col justify-center items-center mb-20 py-15 mx-auto w-[100%] bg-[var(--card-accent-color)]'
			ref={containerRef}
		>
			<header className='features-component-header flex flex-col justify-center items-center mb-12'>
				<h1 className='features-header-text text-2xl md:text-4xl text-white font-extrabold mb-1 mt-4 tracking-wide'>
					Features
				</h1>
				<p className='features-sub-text text-center text-[var(--text-accent-color)] text-sm md:text-base'>
					Explore the powerful features designed to streamline your freelance workflow.
				</p>
			</header>

			<div className='features-item-container grid grid-cols-1 md:grid-cols-3 gap-5 p-4'>
				{features.map((feature, index) => (
					<FeaturesCard
						key={index}
						icon={feature.icon}
						title={feature.title}
						description={feature.description}
						animate={isVisible}
						delay={`${index * 0.2}s`}
					/>
				))}
			</div>
		</div>
	);
}

export default FeaturesComponent;
