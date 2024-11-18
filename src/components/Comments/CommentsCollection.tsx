// 评论集合
import React from 'react';
import type { IComment } from '@/types/comments';
import { weekday } from '@/types/comments';
import { getComments } from '@/scripts/api/comments';
import { cn } from '@/lib/utils';

import dayjs from 'dayjs';
import CommentItem from './CommentItem';

interface IProps {
	pageId: string;
	data: IComment[];
}
function CommentsCollection({ pageId, className }) {
	const [comments, setComments] = React.useState<IComment[]>([]);
	React.useEffect(() => {
		getComments(pageId).then((res) => {
			setComments(res);
		});
	}, []);

	console.log(comments);
	return (
		<div className={cn(className)}>
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
			<p>Comments: {comments.length}</p>
		</div>
	);
}

export default CommentsCollection;
