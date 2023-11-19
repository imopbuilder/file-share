'use client';

import { cn } from '@/lib/utils/cn';
import { motion, type TargetAndTransition } from 'framer-motion';
import { ReactNode, useRef, useState, type MouseEvent } from 'react';

interface HolographicButtonProps {
	children: ReactNode;
	className?: string;
}

export function HolographicButton({ children, className }: HolographicButtonProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	// Mouse positions from -0.5 to 0.5
	const [mouseX, setMouseX] = useState(0);
	const [mouseY, setMouseY] = useState(0);

	const mouseMove = (e: MouseEvent) => {
		if (!containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		setMouseX((e.clientX - rect.left) / rect.width - 0.5);
		setMouseY((e.clientY - rect.top) / rect.height - 0.5);
	};

	const mouseLeave = () => {
		setMouseX(0);
		setMouseY(0);
	};

	const style = {
		'--mx': mouseX,
		'--my': mouseY,
	} as TargetAndTransition;

	return (
		<motion.div
			ref={containerRef}
			className={cn('p-12', className)}
			animate={style}
			transition={{ type: 'tween', duration: 0.1 }}
			onPointerMove={mouseMove}
			onPointerLeave={mouseLeave}
		>
			<div className='relative' style={{ perspective: '1000px' }}>
				<div className='absolute -inset-[6rem]'>
					{/* Holographic glow */}
					<div className='blur-[15px] holographic absolute invert inset-[6rem] opacity-40 group-hover:opacity-100 transition-opacity' />
				</div>
				<button type='button' className='holographic-button group relative py-3.5 px-7 rounded-[20px] bg-zinc-100 overflow-hidden'>
					<div className='absolute inset-0 transition-opacity duration-300'>
						{/* Holographic lighting */}
						<div className='holographic absolute inset-0' />

						{/* Glare */}
						<div className='glare absolute inset-0' />
					</div>

					{/* Overlay */}
					<div className='absolute inset-0.5 rounded-[18px] bg-white opacity-40 group-hover:opacity-0 transition-opacity' />
					<div className='relative text-slate-900 font-semibold transition-colors duration-100'>{children}</div>
				</button>
			</div>
		</motion.div>
	);
}
