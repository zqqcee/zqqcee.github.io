//单条评论
import React from 'react';
import type { IComment } from '@/types/comments';
import dayjs from 'dayjs';
import { weekday } from '@/types/comments';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import CommentForm from './CommentForm';
import { AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { linkDecoration } from '@/helper/link';

interface IProps {
	comment: IComment & { children: any[] };
}
function CommentItem({ comment }: IProps) {
	const [replyVisible, setReplyVisible] = React.useState<boolean>(false);
	const AvatarComp = React.useMemo(
		() => (
			<div className="self-end">
				<Avatar className="w-8 h-8">
					{comment.url ? (
						<a
							href={linkDecoration(comment.url)}
							target="_blank"
							className="underline underline-offset-4 decoration-gray-400"
						>
							<AvatarImage src={comment.avatar} />
						</a>
					) : (
						<AvatarImage src={comment.avatar} />
					)}
				</Avatar>
			</div>
		),
		[comment.avatar],
	);
	return (
		<div className={cn('text-white gap-4 flex flex-col', !!comment?.children?.length && 'mt-2')}>
			<div className={cn('text-white', comment.parentId && 'ml-12')}>
				<div className="flex w-full items-stretch gap-4">
					{AvatarComp}
					<div className="flex flex-col gap-1 text-bold relative">
						<div className="flex gap-2 items-center">
							<div>{comment.username}</div>
							<div className="text-gray-400 text-xs">{`${dayjs(comment.createdTime).format('YYYY-MM-DD HH:MM')} 星期${weekday[dayjs(comment.createdTime).day()]}`}</div>
						</div>
						<div className="rounded-xl rounded-bl-sm bg-gray-600  p-2 min-w-10 w-fit relative group">
							<p className="text-justify text-sm">{comment.text}</p>
							<div
								className={cn(
									'group-hover:visible invisible absolute -right-2 -bottom-2 bg-gray-700 bg-transparent border border-gray-500 shadow-inner shadow-gray-300 w-5 h-5 rounded-lg p-1 hover:scale-110 cursor-pointer active:scale-90',
									comment.parentId && 'hidden',
								)}
								onClick={() => {
									setReplyVisible(true);
								}}
							>
								<img src="/svg/reply.svg" id="reply" />
							</div>
						</div>
					</div>
				</div>
				<AnimatePresence mode="wait" initial={false}>
					{replyVisible && (
						<CommentForm
							isReply
							pageId={comment.pageId}
							setReplyVisible={setReplyVisible}
							parentUser={comment.username}
							parentId={comment.id}
						/>
					)}
				</AnimatePresence>
			</div>
			{!!comment?.children?.length &&
				comment.children.map((c) => {
					return <CommentItem comment={c} key={c.id} />;
				})}
		</div>
	);
}

export default CommentItem;
