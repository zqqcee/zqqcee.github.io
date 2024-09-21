import React from 'react';
import { motion } from 'framer-motion';

function PostLink({ title, href }) {
	const [isHovered, setIsHovered] = React.useState(false);
	return (
		<div
			className="w-fit text-white cursor-pointer font-bold"
			onMouseEnter={() => {
				setIsHovered(true);
			}}
			onMouseLeave={() => {
				setIsHovered(false);
			}}
		>
			<a href={href}>{title}</a>
			<motion.div
				className="h-[1px] bg-white w-0"
				animate={{
					width: isHovered ? '100%' : '0%', // Scale on X-axis
				}}
			/>
		</div>
	);
}

export default PostLink;
