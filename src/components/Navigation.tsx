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
} from '@/components/ui/menubar';

function Navigation() {
	return (
		<Menubar className="w-auto text-white rounded-full ring-1 ring-gray-500 px-6 shadow-inner border-none mt-1">
			<div className="flex gap-4">
				<MenubarMenu>
					<MenubarTrigger>主页</MenubarTrigger>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>文章</MenubarTrigger>
					<MenubarPortal>
						<MenubarContent>
							<MenubarItem>技术</MenubarItem>
							<MenubarItem>思考</MenubarItem>
							<MenubarItem>生活</MenubarItem>
						</MenubarContent>
					</MenubarPortal>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>归档</MenubarTrigger>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>秋招专栏</MenubarTrigger>
					<MenubarPortal>
						<MenubarContent>
							<MenubarItem>刷题笔记</MenubarItem>
							<MenubarItem>八股笔记</MenubarItem>
						</MenubarContent>
					</MenubarPortal>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>书签</MenubarTrigger>
				</MenubarMenu>
			</div>
		</Menubar>
	);
}

export default Navigation;
