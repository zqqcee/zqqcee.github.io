import type { Moment, MomentListResponse, MomentListParams } from '@/types/moment';

// 是否使用 Mock 数据（设为 false 使用真实 API）
const USE_MOCK = false;
const API_BASE = import.meta.env.PUBLIC_API || '';

// ============ MOCK 数据 ============
const MOCK_MOMENTS: Moment[] = [
	{
		id: '65f1a2b3c4d5e6f7a8b9c0d1',
		content: '今天天气真好，出去散步了一圈 🌞',
		images: [
			{
				url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
				width: 1920,
				height: 1080,
				blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
			},
		],
		tags: ['日常', '散步'],
		visibility: 'public',
		createdAt: new Date('2024-03-15T10:30:00Z'),
		updatedAt: new Date('2024-03-15T10:30:00Z'),
	},
	{
		id: '65f1a2b3c4d5e6f7a8b9c0d2',
		content: '学习了新的技术栈，收获满满',
		images: [],
		tags: ['学习', '技术'],
		visibility: 'public',
		createdAt: new Date('2024-03-14T15:20:00Z'),
		updatedAt: new Date('2024-03-14T15:20:00Z'),
	},
	{
		id: '65f1a2b3c4d5e6f7a8b9c0d3',
		content: '周末做了一顿大餐，红烧肉、清蒸鱼、蒜蓉西兰花，家人都说好吃！\n\n厨艺又进步了一点点 👨‍🍳',
		images: [
			{
				url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
				width: 1200,
				height: 900,
				blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.',
			},
			{
				url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
				width: 1200,
				height: 900,
			},
		],
		tags: ['美食', '周末'],
		visibility: 'public',
		createdAt: new Date('2024-03-13T18:00:00Z'),
		updatedAt: new Date('2024-03-13T19:30:00Z'),
	},
	{
		id: '65f1a2b3c4d5e6f7a8b9c0d4',
		content:
			'读完了《深入理解计算机系统》的第三章，终于搞懂了汇编和程序的机器级表示。\n\n这本书确实是经典，每一章都值得反复阅读。',
		images: [],
		tags: ['读书', '技术'],
		visibility: 'public',
		createdAt: new Date('2024-03-12T09:00:00Z'),
		updatedAt: new Date('2024-03-12T09:00:00Z'),
	},
	{
		id: '65f1a2b3c4d5e6f7a8b9c0d5',
		content: '今天去了海边，看到了很美的日落。\n\n大自然总是能让人心情平静下来。',
		images: [
			{
				url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
				width: 1920,
				height: 1080,
				blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH',
			},
			{
				url: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
				width: 1920,
				height: 1280,
			},
			{
				url: 'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?w=800',
				width: 1920,
				height: 1280,
			},
		],
		tags: ['旅行', '摄影'],
		visibility: 'public',
		createdAt: new Date('2024-03-10T17:30:00Z'),
		updatedAt: new Date('2024-03-10T17:30:00Z'),
	},
	{
		id: '65f1a2b3c4d5e6f7a8b9c0d6',
		content: '新入手了一台机械键盘，打字手感真的很棒！',
		images: [
			{
				url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
				width: 1200,
				height: 800,
			},
		],
		tags: ['数码', '键盘'],
		visibility: 'public',
		createdAt: new Date('2024-03-08T14:00:00Z'),
		updatedAt: new Date('2024-03-08T14:00:00Z'),
	},
	{
		id: '65f1a2b3c4d5e6f7a8b9c0d7',
		content: '终于把拖延了很久的代码重构完成了，感觉整个项目清爽了很多。\n\n重构虽然累，但是值得！',
		images: [],
		tags: ['编程', '重构'],
		visibility: 'public',
		createdAt: new Date('2024-03-06T22:00:00Z'),
		updatedAt: new Date('2024-03-06T22:00:00Z'),
	},
	{
		id: '65f1a2b3c4d5e6f7a8b9c0d8',
		content: '周末和朋友们去爬山了，虽然很累但是很开心！\n\n山顶的风景真的很美，下次还要来。',
		images: [
			{
				url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
				width: 1920,
				height: 1280,
			},
			{
				url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800',
				width: 1920,
				height: 1280,
			},
			{
				url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800',
				width: 1920,
				height: 1280,
			},
			{
				url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
				width: 1920,
				height: 1280,
			},
		],
		tags: ['户外', '爬山', '朋友'],
		visibility: 'public',
		createdAt: new Date('2024-03-03T16:00:00Z'),
		updatedAt: new Date('2024-03-03T16:00:00Z'),
	},
];

// ============ MOCK API 函数 ============
async function getMomentsMock(params: MomentListParams): Promise<MomentListResponse> {
	const { page = 1, limit = 10, visibility = 'public' } = params;

	// 模拟网络延迟
	await new Promise((resolve) => setTimeout(resolve, 500));

	let filtered = MOCK_MOMENTS.filter((m) => m.visibility === visibility);

	// 按 createdAt 倒序
	filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

	const start = (page - 1) * limit;
	const items = filtered.slice(start, start + limit);

	return {
		code: 0,
		msg: 'success',
		data: {
			items,
			page,
			limit,
			total: filtered.length,
			totalPages: Math.ceil(filtered.length / limit),
			hasMore: start + limit < filtered.length,
		},
	};
}

// ============ 真实 API 函数 ============
async function getMomentsReal(params: MomentListParams): Promise<MomentListResponse> {
	const url = new URL('moments', import.meta.env.PUBLIC_API);

	const searchParams = new URLSearchParams();
	if (params.page) searchParams.set('page', params.page.toString());
	if (params.limit) searchParams.set('limit', params.limit.toString());
	if (params.visibility) searchParams.set('visibility', params.visibility);
	url.search = searchParams.toString();

	const response = await fetch(url, {
		method: 'GET',
	});
	const data = await response.json();

	// 解析日期字符串为 Date 对象
	if (data.data?.items) {
		data.data.items = data.data.items.map((item: Moment) => ({
			...item,
			createdAt: new Date(item.createdAt),
			updatedAt: new Date(item.updatedAt),
		}));
	}

	return data;
}

// ============ 导出的 API 函数 ============
export async function getMoments(params: MomentListParams = {}): Promise<MomentListResponse> {
	return USE_MOCK ? getMomentsMock(params) : getMomentsReal(params);
}
