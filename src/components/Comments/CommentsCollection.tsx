// 评论集合
import React from 'react';
import type { IComment } from '@/types/comments';
import { getComments } from '@/scripts/api/comments';
import { cn } from '@/lib/utils';
import { Player } from '@lottiefiles/react-lottie-player';
import CommentItem from './CommentItem';
import { arrToTree } from '@/helper/comment';

const CommentsCollection = ({ pageId, className = '' }) => {
	const [comments, setComments] = React.useState<IComment[]>([]);
	const [loading, setLoading] = React.useState<boolean>(true);
	React.useEffect(() => {
		setLoading(true);
		getComments(pageId)
			.then((res) => {
				setComments(arrToTree(res || [], 'id', 'parentId'));
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return loading ? (
		<div className="flex text-neutral-200 items-center">
			<Player src={'/lottie/loading.json'} loop autoplay className="w-20 h-20" />
			<div>评论区载入中</div>
		</div>
	) : (
		<div className={cn('text-white gap-4 flex flex-col', className)}>
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</div>
	);
};

export default CommentsCollection;
