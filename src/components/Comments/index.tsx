import React from 'react';
import type { IComment } from '@/types/comments';
import CommentsCollection from './CommentsCollection';
import CommentForm from './CommentForm';

interface IProps {
	pageId: string;
}
function Comments({ pageId }: IProps) {
	return (
		<div>
			<CommentForm pageId={pageId} />
			<CommentsCollection pageId={pageId} className={'mt-10'} />
		</div>
	);
}

export default Comments;
