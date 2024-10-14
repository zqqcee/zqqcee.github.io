import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/Drawer';
import { MenuConfig } from './config';
import React from 'react';
// import '@/styles/global.css';

function SMNavigation() {
	return (
		<Drawer>
			<DrawerTrigger>
				<div className="w-10 h-10 border border-gray-500 rounded-full p-2 focus-visible:ring-transparent">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="size-full stroke-gray-300"
					>
						<path
							d="M4 6H20M4 12H20M4 18H20"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</DrawerTrigger>
			<DrawerContent className="h-4/5 border-none py-10 backdrop-blur-xl bg-gray-900/30">
				<div className="h-2 bg-gray-600 mb-4 w-20 mx-auto rounded-lg "></div>
				<div className="w-full h-full">
					{Object.keys(MenuConfig).map((key) => {
						const menu = MenuConfig[key];
						return (
							<div className="sm-menu-item" key={key}>
								<menu.icon className="w-5 h-5" />
								<a className="whitespace-nowrap" href={menu.href} target="_self">
									{menu.title}
								</a>
							</div>
						);
					})}
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export default SMNavigation;
