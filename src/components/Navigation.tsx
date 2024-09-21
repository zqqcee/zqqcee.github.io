import React from 'react';

function Navigation() {
	return (
		<div className="flex justify-between items-center px-16 border-b h-10 gap-4 shadow-2xl">
			<div className="bold">zqqcee</div>
			<div className="flex justify-start gap-10">
				<div className="w-10 text-white">pages</div>
				<div className="w-10">talks</div>
				<div className="w-10">thought</div>
			</div>
		</div>
	);
}

export default Navigation;
