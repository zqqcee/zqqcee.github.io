// 评论集合
import React from 'react';
import type { IComment } from '@/types/comments';
import { getComments } from '@/scripts/api/comments';
import { cn } from '@/lib/utils';
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
			<div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-t-gray-300" />
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
