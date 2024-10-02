import React from 'react';
import Navigation from './Navigation';
import avatar from '../../public/avatar.jpeg';
import Signatrue, { SignatureLogo } from './Signature';

function Header() {
	return (
		<div className="w-full grid grid-flow-col items-center box-border fixed top-0 inset-x-0 z-[9] mx-auto px-40 py-3">
			<div className="flex justify-center items-center gap-3 ">
				<img src={avatar.src} className="rounded-2xl object-fill bg-cover w-11 h-11" />
			</div>
			<div className="grow flex justify-center">
				<Navigation />
			</div>
			<div className="flex row-end-1 justify-center gap-4">
				<SignatureLogo />
				<Signatrue />
			</div>
		</div>
	);
}

export default Header;
