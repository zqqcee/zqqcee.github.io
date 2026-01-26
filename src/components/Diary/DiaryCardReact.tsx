import type { IDiary, BookMetadata, MovieMetadata, LinkMetadata } from '@/types/diary';
import { DiaryType } from '@/types/diary';
import dayjs from 'dayjs';

interface DiaryCardProps {
	diary: IDiary;
}

const typeIcons: Record<DiaryType, string> = {
	[DiaryType.TEXT]: '',
	[DiaryType.BOOK]: '📚',
	[DiaryType.MOVIE]: '🎬',
	[DiaryType.LINK]: '🔗',
	[DiaryType.MUSIC]: '🎵',
	[DiaryType.PHOTO]: '📷',
};

const renderStars = (rating?: number) => {
	if (!rating) return '';
	return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

export default function DiaryCardReact({ diary }: DiaryCardProps) {
	const formattedDate = dayjs(diary.date).format('YYYY/MM/DD');

	return (
		<a
			href={`/diary/detail/${diary.id}`}
			className="diary-card relative rounded-lg border border-gray-700/50 hover:border-gray-600 bg-slate-800/50 hover:bg-slate-800/70 backdrop-blur-sm transition-all duration-300 p-6 group block"
		>
			{/* 类型图标 (左上角) */}
			{typeIcons[diary.type] && (
				<div className="absolute top-4 left-4 text-xl opacity-70">{typeIcons[diary.type]}</div>
			)}

			{/* Pin 图标 (右上角) */}
			{diary.pin && (
				<div className="absolute top-4 right-4">
					<img
						src="/svg/pin.svg"
						alt="pinned"
						className="w-5 h-5 stroke-amber-400 fill-amber-400"
					/>
				</div>
			)}

			{/* 头部: 头像 + 作者 + 日期 */}
			<div className="flex items-start justify-between gap-4 mt-2">
				<div className="flex items-center gap-3 flex-1">
					<img
						src={diary.avatar}
						alt={diary.author}
						className="w-10 h-10 rounded-full object-cover border border-gray-600"
					/>
					<div className="flex-1 min-w-0">
						<div className="text-white font-medium truncate">{diary.author}</div>
						<div className="text-gray-400 text-sm">{formattedDate}</div>
					</div>
				</div>
			</div>

			{/* Metadata 区域 - Book */}
			{diary.type === DiaryType.BOOK && diary.metadata && (
				<div className="mt-4 p-4 rounded-lg bg-sky-900/20 border border-sky-700/30">
					<div className="flex gap-4">
						{(diary.metadata as BookMetadata).coverImage && (
							<img
								src={(diary.metadata as BookMetadata).coverImage}
								alt="book cover"
								className="w-16 h-24 object-cover rounded"
							/>
						)}
						<div className="flex-1 min-w-0">
							<div className="text-white font-semibold text-lg truncate">
								{(diary.metadata as BookMetadata).bookTitle}
							</div>
							<div className="text-gray-300 text-sm mt-1">
								{(diary.metadata as BookMetadata).bookAuthor}
							</div>
							{(diary.metadata as BookMetadata).rating && (
								<div className="text-amber-400 text-sm mt-2">
									{renderStars((diary.metadata as BookMetadata).rating)}
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Metadata 区域 - Movie */}
			{diary.type === DiaryType.MOVIE && diary.metadata && (
				<div className="mt-4 p-4 rounded-lg bg-purple-900/20 border border-purple-700/30">
					<div className="flex gap-4">
						{(diary.metadata as MovieMetadata).posterImage && (
							<img
								src={(diary.metadata as MovieMetadata).posterImage}
								alt="movie poster"
								className="w-16 h-24 object-cover rounded"
							/>
						)}
						<div className="flex-1 min-w-0">
							<div className="text-white font-semibold text-lg truncate">
								{(diary.metadata as MovieMetadata).movieTitle}
							</div>
							<div className="text-gray-300 text-sm mt-1">
								导演: {(diary.metadata as MovieMetadata).director}
							</div>
							<div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
								{(diary.metadata as MovieMetadata).year && (
									<span>{(diary.metadata as MovieMetadata).year}</span>
								)}
								{(diary.metadata as MovieMetadata).rating && (
									<span className="text-amber-400">
										{renderStars((diary.metadata as MovieMetadata).rating)}
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Metadata 区域 - Link */}
			{diary.type === DiaryType.LINK && diary.metadata && (
				<div className="mt-4 p-4 rounded-lg bg-green-900/20 border border-green-700/30 hover:bg-green-900/30 transition-colors">
					<div className="flex items-start gap-3">
						{(diary.metadata as LinkMetadata).favicon && (
							<img
								src={(diary.metadata as LinkMetadata).favicon}
								alt="favicon"
								className="w-5 h-5 mt-1"
							/>
						)}
						<div className="flex-1 min-w-0">
							<div className="text-white font-semibold truncate">
								{(diary.metadata as LinkMetadata).linkTitle}
							</div>
							{(diary.metadata as LinkMetadata).linkDescription && (
								<div className="text-gray-300 text-sm mt-1 line-clamp-2">
									{(diary.metadata as LinkMetadata).linkDescription}
								</div>
							)}
							<div className="text-gray-500 text-xs mt-2 truncate">
								{(diary.metadata as LinkMetadata).url}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* 内容 */}
			<div className="mt-4 text-gray-200 text-sm leading-relaxed line-clamp-3">
				{diary.content}
			</div>

			{/* 图片库 */}
			{diary.images && diary.images.length > 0 && (
				<div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-hidden">
					{diary.images.slice(0, 6).map((image, idx) => (
						<div
							key={idx}
							className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
						>
							<img
								src={image}
								alt="diary image"
								loading="lazy"
								className="w-full h-full object-cover"
							/>
						</div>
					))}
				</div>
			)}

			{/* 标签 */}
			{diary.tags && diary.tags.length > 0 && (
				<div className="mt-4 flex flex-wrap gap-2">
					{diary.tags.map((tag, idx) => (
						<span
							key={idx}
							className="inline-block px-2 py-1 text-xs rounded-md bg-sky-900/40 text-sky-200"
						>
							{tag}
						</span>
					))}
				</div>
			)}

			{/* 底部: 互动数据 */}
			<div className="mt-4 pt-4 border-t border-gray-700/30 flex gap-4 text-xs text-gray-400">
				<span className="flex items-center gap-1">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
					</svg>
					{diary.likes || 0}
				</span>
				<span className="flex items-center gap-1">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
					</svg>
					{diary.commentsCount || 0}
				</span>
			</div>
		</a>
	);
}
