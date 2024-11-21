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
			<div className="mt-12">
				<CommentForm pageId={pageId} />
			</div>
			<CommentsCollection pageId={pageId} className={'mt-10'} />
		</div>
	);
}

export default Comments;
