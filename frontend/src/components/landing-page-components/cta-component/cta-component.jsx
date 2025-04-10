import React, { useRef, useState, useEffect } from 'react';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import './cta-component.css';

function CtaComponent() {
	const containerRef = useRef(null);
	const isVisible = useIntersectionObserver(containerRef);

	const [installPrompt, setInstallPrompt] = useState(null);

	useEffect(() => {
		const handleBeforeInstallPrompt = (event) => {
			event.preventDefault();
			setInstallPrompt(event);
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		};
	}, []);

	const handleInstallClick = () => {
		if (installPrompt) {
			installPrompt.prompt();
			installPrompt.userChoice.then((choiceResult) => {
				console.log(choiceResult.outcome); // User choice (accepted or dismissed)
				setInstallPrompt(null);
			});
		}
	};
	return (
		<div
			className='cta-component w-full py-16 px-4 sm:px-8 md:px-16 flex justify-center items-center'
			ref={containerRef}
		>
			<div className={`cta-component-content text-center max-w-2xl ${isVisible ? 'fade-up' : ''}`}>
				<h2 className='cta-component-content-title text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2'>
					Ready to get started?
				</h2>
				<p className='cta-component-content-text text-[var(--text-accent-color)] text-sm sm:text-base md:text-lg mb-6'>
					Join us today and take your first step towards a brighter future.
				</p>
				<button className='cta-component-content-button bg-white text-base text-[var(--card-accent-color)] cursor-pointer hover:bg-gray-200 hover:shadow-lg hover:scale-105 font-semibold px-6 py-3 rounded-lg transition-all duration-300'>
					Get Started
				</button>
			</div>

			{installPrompt && (
				<button
					className='install-button'
					onClick={handleInstallClick}
				>
					Install Web App
				</button>
			)}
		</div>
	);
}

export default CtaComponent;
