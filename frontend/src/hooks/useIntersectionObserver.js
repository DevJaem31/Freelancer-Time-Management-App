import { useState, useEffect } from 'react';

const useIntersectionObserver = (ref, threshold = 0.5) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.target === ref.current) {
						setIsVisible(entry.isIntersecting);
					}
				});
			},
			{
				threshold,
			},
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, [ref, threshold]);

	return isVisible;
};

export default useIntersectionObserver;
