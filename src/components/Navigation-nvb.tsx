import React from 'react';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from '@/components/ui/NavigationMenu';

import { MagicCard } from '@/components/ui/MagicCard';
import { motion, AnimatePresence } from 'framer-motion';

function Navigation() {
	return (
		// <MagicCard className="w-auto text-white rounded-full ring-1 ring-gray-500 px-6 shadow-inner border-none mt-1 ">
		<NavigationMenu
			orientation="vertical"
			delayDuration={20}
			onValueChange={() => {
				setTimeout(() => {
					const triggers = document.querySelectorAll('.submenu-trigger[data-state="open"]');
					if (triggers.length === 0) return;
					const firstTrigger = triggers[0] as HTMLElement;
					const viewports = document.getElementsByClassName('submenu-viewport');
					if (viewports.length > 0) {
						const viewport = viewports[0] as HTMLElement;
						viewport.style.left = `calc(${firstTrigger.offsetLeft}px + 2rem)`;
					}
				});
			}}
		>
			<MagicCard className="w-auto text-white rounded-full ring-1 ring-gray-500 px-6 shadow-inner border-none mt-1 ">
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="submenu-trigger">
							<div className="w-32">Getting started</div>
						</NavigationMenuTrigger>
						<NavigationMenuContent className="absolute t-[100%]">
							<div className="m-0 flex flex-col gap-5  w-32">
								<div>whtae</div>
								<div>whtae</div>
								<div>whtae</div>
								<div>whtae</div>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="submenu-trigger">Components</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-4 md:grid-cols-2  "></ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem></NavigationMenuItem>
				</NavigationMenuList>
			</MagicCard>
		</NavigationMenu>
		// </MagicCard>
	);
}
export default Navigation;
