import { useState, useEffect, useRef, useReducer } from 'react';
import type { IDiary } from '@/types/diary';
import { getDiaries } from '@/data/diary';
import BlurFade from '@/components/ui/BlurFadeIn';
import DiaryCardReact from './DiaryCardReact';
interface DiaryListProps {
	pageSize?: number;
}
export default function DiaryList({ pageSize = 5 }: DiaryListProps) {
	const [diaries, setDiaries] = useReducer<(p: IDiary[], v: IDiary[]) => IDiary[]>(
		(p, v) => [...p, ...v],
		[],
	);
	const pageRef = useRef(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const observerRef = useRef<HTMLDivElement | null>(null);

	// 加载下一页数据
	const loadMore = async () => {
		setLoading(true);
		const page = pageRef.current;
		try {
			const response = await getDiaries(page, pageSize);
			if (response.data.length === 0) {
				setHasMore(false);
			} else {
				setDiaries(response.data);
				pageRef.current += 1;
			}
		} catch (error) {
			console.error('Failed to load more diaries:', error);
		} finally {
			setLoading(false);
		}
	};

	// IntersectionObserver 监听
	useEffect(() => {
		// 如果没有更多数据，不创建 observer
		// if (!hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMore();
				}
			},
			{ threshold: 0.1 },
		);
		if (observerRef.current) {
			observer.observe(observerRef.current);
		}
		return () => {
			if (observerRef.current) {
				observer.unobserve(observerRef.current);
			}
			observer.disconnect();
		};
	}, []); // 只依赖 hasMore,避免循环依赖

	return (
		<div className="flex w-full flex-col justify-start gap-4">
			{diaries.map((diary, i) => (
				<BlurFade key={diary.id} className="w-full" delay={0.1 * (i % 5)}>
					<DiaryCardReact diary={diary} />
				</BlurFade>
			))}

			{/* 哨兵元素 */}
			<div ref={observerRef} className="h-10" />

			{/* Loading 指示器 */}
			{loading && (
				<div className="flex items-center justify-center py-8">
					<div className="flex flex-col items-center gap-2">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-sky-500"></div>
						<span className="text-sm text-gray-400">加载中...</span>
					</div>
				</div>
			)}

			{/* 没有更多提示 */}
			{!hasMore && !loading && diaries.length > 0 && (
				<div className="flex items-center justify-center py-8">
					<span className="text-sm text-gray-500">没有更多了 ~</span>
				</div>
			)}

			{/* 空状态 */}
			{!loading && diaries.length === 0 && (
				<div className="flex items-center justify-center py-20">
					<div className="text-center">
						<div className="mb-2 text-lg text-gray-500">还没有日记</div>
						<div className="text-sm text-gray-600">开始记录你的生活吧</div>
					</div>
				</div>
			)}
		</div>
	);
}
