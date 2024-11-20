//单条评论
import React from 'react';
import type { IComment } from '@/types/comments';
import dayjs from 'dayjs';
import { weekday } from '@/types/comments';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import CommentForm from './CommentForm';

interface IProps {
	comment: IComment;
}
function CommentItem({ comment }: IProps) {
	const [hover, setHover] = React.useState<boolean>(false);
	const [replyVisible, setReplyVisible] = React.useState<boolean>(false);
	const AvatarComp = React.useMemo(
		() => (
			<div className="self-end">
				<Avatar>
					<AvatarImage src={comment.avatar} />
				</Avatar>
			</div>
		),
		[comment.avatar],
	);
	return (
		<div className="text-white">
			<div
				className="flex w-full items-stretch gap-4 "
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				{AvatarComp}
				<div className="flex-col gap-2 text-bold relative">
					<div className="flex gap-2 items-center">
						<div>{comment.username}</div>
						<div className="text-gray-400 text-xs">{`${dayjs(comment.createdTime).format('YYYY-MM-DD HH:MM')} 星期${weekday[dayjs(comment.createdTime).day()]}`}</div>
					</div>
					<div className="rounded-xl rounded-bl-sm bg-gray-600 p-2 w-fit">
						<p className="text-justify">{comment.text}</p>
					</div>
					{hover && (
						<div
							className="absolute -right-2 -bottom-2 bg-gray-700 w-5 h-5 rounded-lg p-1 hover:scale-110 transition-all cursor-pointer active:scale-90"
							onClick={() => {
								setReplyVisible(true);
							}}
						>
							<img src="/reply.svg" />
						</div>
					)}
				</div>
			</div>
			{replyVisible && (
				<CommentForm
					isReply
					pageId={comment.pageId}
					setReplyVisible={setReplyVisible}
					parentUser={comment.username}
				/>
			)}
		</div>
	);
}

export default CommentItem;
