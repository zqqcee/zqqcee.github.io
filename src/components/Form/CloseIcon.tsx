import React from 'react';

function CloseIcon(props) {
	return (
		<div
			className="absolute -right-2 -top-2 text-white w-5 h-5 hover:scale-110 transition-all cursor-pointer active:scale-90"
			{...props}
		>
			<img src="/svg/close.svg" className="object-cover fill-black" />
		</div>
	);
}

export default CloseIcon;
