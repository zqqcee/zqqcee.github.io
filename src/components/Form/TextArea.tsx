import React from 'react';
import { cn } from '@/lib/utils';
import { MagicCard } from '../ui/MagicCard';
function TextArea(props) {
	const { maxLength, replyUser, placeholder, ...other } = props;
	const replyEle = React.useMemo(() => {
		if (replyUser)
			return (
				<div className="text-gray-300 text-sm pl-2">
					<span>回复</span>
					<strong className="text-gray-100">{` @${replyUser}`}</strong>
				</div>
			);
		return <div />;
	}, []);
	return (
		<MagicCard
			className="box-border border border-gray-600 rounded-md shadow-gray-700 w-full bg-gray-800/20"
			gradientSize={400}
			gradientOpacity={0.1}
			gradientColor={'#ffffff60'}
			extendStyle="w-full"
		>
			<textarea
				{...other}
				className="p-2 bg-transparent text-white h-[100px] lg:h-[150px] w-full placeholder:text-gray-300 placeholder:text-sm focus-visible:outline-none text-sm resize-none"
				placeholder={placeholder}
				required
			/>
			<div className="flex pb-2 w-full justify-between">
				{replyEle}
				<div
					className={cn(
						'gap-6 items-end pr-4 h-fit flex self-end',
						other.value ? 'visible' : 'invisible',
					)}
				>
					<div className="text-xs text-gray-400">{`${other.value?.length}/${maxLength}`}</div>
					<div className="text-xs  flex gap-2 items-center cursor-pointer active:scale-90 hover:scale-105 duration-100">
						<div>
							<img src="/svg/send.svg" className="object-fill w-4 h-4" />
						</div>
						<div>
							<button type="submit">送达</button>
						</div>
					</div>
				</div>
			</div>
		</MagicCard>
	);
}

export default TextArea;
