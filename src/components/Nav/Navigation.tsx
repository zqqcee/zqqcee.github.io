import React from 'react';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarPortal,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from '@/components/ui/Menubar';
import { MagicCard } from '@/components/ui/MagicCard';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuConfig } from './config';

function Navigation() {
	return (
		<MagicCard
			className="w-auto text-white rounded-full ring-1 ring-gray-500 px-6 shadow-inner border-none mt-1 bg-netrual-800"
			gradientColor="#ffffff90"
		>
			<Menubar className="border-none">
				<div className="flex">
					{Object.keys(MenuConfig).map((key) => {
						const menu = MenuConfig[key];
						return (
							<MenubarMenu key={key}>
								<MenubarTrigger>
									<a href={menu.href} target="_self">
										{menu.title}
									</a>
								</MenubarTrigger>
							</MenubarMenu>
						);
					})}
				</div>
			</Menubar>
		</MagicCard>
	);
}
export default Navigation;
