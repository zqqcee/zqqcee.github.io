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

function Navigation() {
	// const [menukey, setMenukey] = React.useState<string>();
	return (
		<MagicCard className="w-auto text-white rounded-full ring-1 ring-gray-500 px-6 shadow-inner border-none mt-1">
			<Menubar className="border-none">
				<div className="flex gap-4">
					<MenubarMenu>
						<MenubarTrigger>主页</MenubarTrigger>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>文章</MenubarTrigger>
						<AnimatePresence>
							<MenubarContent>
								<MenubarItem>技术</MenubarItem>
								<MenubarItem>思考</MenubarItem>
								<MenubarItem>生活</MenubarItem>
							</MenubarContent>
						</AnimatePresence>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>归档</MenubarTrigger>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>秋招专栏</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>算法笔记</MenubarItem>
							<MenubarItem>八股笔记</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>书签</MenubarTrigger>
					</MenubarMenu>
				</div>
			</Menubar>
		</MagicCard>
	);
}
export default Navigation;
