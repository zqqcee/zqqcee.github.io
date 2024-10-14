import React from 'react';
import { postMessage } from '@/scripts/api/message/postMessage';

const postMessagefn = async () => {
	const a = await postMessage({
		name: 'zqqcee',
		text: 'test message',
		email: 'zqqcee@gmail.com',
	});
};
function Test() {
	return (
		<button
			onClick={() => {
				postMessagefn();
			}}
		>
			123123123
		</button>
	);
}

export default Test;
