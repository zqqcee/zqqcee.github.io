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
	return (
		<MagicCard className="w-auto text-white rounded-full ring-1 ring-gray-500 px-6 shadow-inner border-none mt-1 ">
			<Menubar className="border-none">
				<div className="flex">
					<MenubarMenu>
						<MenubarTrigger>
							<a href="/" target="_self">
								主页
							</a>
						</MenubarTrigger>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>
							<a href="/posts" target="_self">
								文章
							</a>
						</MenubarTrigger>
						{/* <MenubarContent>
							<MenubarItem>技术</MenubarItem>
							<MenubarItem>思考</MenubarItem>
							<MenubarItem>生活</MenubarItem>
						</MenubarContent> */}
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>
							<a href="/thoughts" target="_self">
								小记
							</a>
						</MenubarTrigger>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>
							<a href="/interview" target="_self">
								秋招专栏
							</a>
						</MenubarTrigger>
						{/* <MenubarContent>
							<MenubarItem>
								<a href="/interview/algorithm" target="_self">
									算法笔记
								</a>
							</MenubarItem>
							<MenubarItem>八股笔记</MenubarItem>
						</MenubarContent> */}
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>
							<a href="/bookmark" target="_self">
								书签
							</a>
						</MenubarTrigger>
					</MenubarMenu>
				</div>
			</Menubar>
		</MagicCard>
	);
}
export default Navigation;
