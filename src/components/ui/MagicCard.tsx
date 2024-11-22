'use client';

import React, { useCallback, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

import { cn } from '@/lib/utils';

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
	gradientSize?: number;
	gradientColor?: string;
	gradientOpacity?: number;
	extendStyle?: string;
}

export function MagicCard({
	children,
	className,
	gradientSize = 50,
	gradientColor = '#ffffff',
	gradientOpacity = 0.2,
	extendStyle = '',
}: MagicCardProps) {
	const mouseX = useMotionValue(-gradientSize);
	const mouseY = useMotionValue(-gradientSize);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const { left, top } = e.currentTarget.getBoundingClientRect();
			mouseX.set(e.clientX - left);
			mouseY.set(e.clientY - top);
		},
		[mouseX, mouseY],
	);

	const handleMouseLeave = useCallback(() => {
		mouseX.set(-gradientSize);
		mouseY.set(-gradientSize);
	}, [mouseX, mouseY, gradientSize]);

	useEffect(() => {
		mouseX.set(-gradientSize);
		mouseY.set(-gradientSize);
	}, [mouseX, mouseY, gradientSize]);

	return (
		<div
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={cn(
				'group relative flex size-full overflow-hidden rounded-xl bg-black text-white',
				className,
			)}
		>
			<div className={cn('relative z-10', extendStyle)}>{children}</div>
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
					opacity: gradientOpacity,
				}}
			/>
		</div>
	);
}
