import React from 'react';
import type { IComment } from '@/types/comments';
import CommentsCollection from './CommentsCollection';
import CommentForm from './CommentForm';

interface IProps {
	pageId: string;
	pageTitle: string;
}
function Comments({ pageId, pageTitle }: IProps) {
	return (
		<div>
			<div className="mt-12">
				<CommentForm pageId={pageId} pageTitle={pageTitle} />
			</div>
			<CommentsCollection pageId={pageId} className={'mt-10'} />
		</div>
	);
}

export default Comments;
