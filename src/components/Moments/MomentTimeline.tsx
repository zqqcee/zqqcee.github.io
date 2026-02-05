import { useState, useEffect, useRef, useReducer, useMemo } from 'react';
import type { Moment } from '@/types/moment';
import { getMoments } from '@/data/moments';
import BlurFade from '@/components/ui/BlurFadeIn';
import MomentCard from './MomentCard';
import dayjs from 'dayjs';

interface MomentTimelineProps {
	limit?: number;
}

export default function MomentTimeline({ limit = 10 }: MomentTimelineProps) {
	const [moments, setMoments] = useReducer<(p: Moment[], v: Moment[]) => Moment[]>(
		(p, v) => [...p, ...v],
		[],
	);
	const pageRef = useRef(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const observerRef = useRef<HTMLDivElement | null>(null);

	// 按日期分组
	const groupedMoments = useMemo(() => {
		const groups: Record<string, Moment[]> = {};
		moments.forEach((moment) => {
			const date = dayjs(moment.createdAt).format('YYYY-MM-DD');
			if (!groups[date]) groups[date] = [];
			groups[date].push(moment);
		});
		return groups;
	}, [moments]);

	// 加载数据
	const loadMore = async () => {
		if (loading || !hasMore) return;
		setLoading(true);
		const page = pageRef.current;
		try {
			const response = await getMoments({ page, limit, visibility: 'public' });
			if (response.data.items.length === 0 || !response.data.hasMore) {
				setHasMore(false);
			}
			if (response.data.items.length > 0) {
				setMoments(response.data.items);
				pageRef.current += 1;
			}
		} catch (error) {
			console.error('Failed to load moments:', error);
			// 请求失败时停止继续加载，避免无限重试
			setHasMore(false);
		} finally {
			setLoading(false);
		}
	};

	// IntersectionObserver 监听
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loading) {
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
	}, [hasMore, loading]);

	// 获取排序后的日期
	const sortedDates = Object.keys(groupedMoments).sort(
		(a, b) => new Date(b).getTime() - new Date(a).getTime(),
	);

	let animationIndex = 0;

	return (
		<div className="moments-timeline">
			{sortedDates.map((date) => (
				<div key={date} className="mb-8">
					{/* 日期标记 */}
					<div className="moment-date-marker relative mb-4">
						<span className="text-sm font-medium text-gray-400">
							{dayjs(date).format('MM月DD日')}
						</span>
					</div>

					{/* 当天的 Moments */}
					<div className="flex flex-col gap-4">
						{groupedMoments[date].map((moment) => {
							const currentIndex = animationIndex++;
							return (
								<BlurFade key={moment.id} delay={0.1 * (currentIndex % 5)}>
									<MomentCard moment={moment} />
								</BlurFade>
							);
						})}
					</div>
				</div>
			))}

			{/* 哨兵元素 */}
			<div ref={observerRef} className="h-10" />

			{/* Loading 指示器 */}
			{loading && (
				<div className="flex items-center justify-center gap-2 py-4">
					<div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-gray-400"></div>
					<span className="text-xs text-gray-500">加载中...</span>
				</div>
			)}

			{/* 没有更多提示 */}
			{!hasMore && !loading && moments.length > 0 && (
				<div className="flex items-center justify-center py-8">
					<span className="text-sm text-gray-500">没有更多了 ~</span>
				</div>
			)}

			{/* 空状态 */}
			{!loading && moments.length === 0 && (
				<div className="flex items-center justify-center py-20">
					<div className="text-center">
						<div className="mb-2 text-lg text-gray-500">他们消失了</div>
					</div>
				</div>
			)}
		</div>
	);
}
