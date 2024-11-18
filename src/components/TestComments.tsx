import React from 'react';
import { getComments } from '@/scripts/api/comments';

function TestComments() {
	return (
		<button
			className="mt-20"
			onClick={() => {
				getComments('astro-cookbook');
			}}
		>
			测试接口
		</button>
	);
}

export default TestComments;
