// 评论集合
import React from 'react';
import type { IComment } from '@/types/comments';
import { getComments } from '@/scripts/api/comments';

interface IProps {
	pageId: string;
	data: IComment[];
}
const mockData = [
	{
		id: 9,
		pageId: 'astro-cookbook',
		parentId: null,
		email: 'zqqcee@163.com',
		url: 'luckycc.cc',
		username: 'zqqcee',
		createdTime: '2024-11-15T16:20:49.962Z',
		approved: false,
		text: 'i love you',
	},
	{
		id: 22,
		pageId: 'astro-cookbook',
		parentId: null,
		email: 'zqqcee@163.com',
		url: 'luckycc.cc',
		username: 'luckycc',
		createdTime: '2024-11-15T16:40:40.886Z',
		approved: false,
		text: 'i love you',
	},
];
function CommentsCollection({ pageId }) {
	const [comments, setComments] = React.useState<IComment[]>([]);
	React.useEffect(() => {
		getComments(pageId).then((res) => {
			setComments(res);
		});
	}, []);

	console.log(comments);
	return <div></div>;
}

export default CommentsCollection;
