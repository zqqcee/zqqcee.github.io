import type { Moment } from '@/types/moment';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import MomentImageGallery from './MomentImageGallery';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

interface MomentCardProps {
	moment: Moment;
}

export default function MomentCard({ moment }: MomentCardProps) {
	const relativeDate = dayjs(moment.createdAt).fromNow();
	const fullDate = dayjs(moment.createdAt).format('YYYY-MM-DD HH:mm');

	return (
		<div className="moment-card group">
			{/* 时间 */}
			<div className="mb-2 flex items-center gap-2">
				<span className="text-sm text-gray-400" title={fullDate}>
					{relativeDate}
				</span>
			</div>

			{/* 内容 */}
			<div className="whitespace-pre-wrap text-base leading-relaxed text-gray-100">
				{moment.content}
			</div>

			{/* 图片 */}
			{moment.images.length > 0 && <MomentImageGallery images={moment.images} />}

			{/* 标签 */}
			{moment.tags.length > 0 && (
				<div className="mt-4 flex flex-wrap gap-2">
					{moment.tags.map((tag) => (
						<span
							key={tag}
							className="rounded-full bg-gray-700/50 px-2 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-600/50"
						>
							#{tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
}
