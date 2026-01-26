import type {
	IDiary,
	IDiaryListResponse,
	DiaryType,
	BookMetadata,
	MovieMetadata,
	LinkMetadata,
} from '@/types/diary';

// Mock 数据 - 包含不同类型的日记示例
const MOCK_DIARIES: IDiary[] = [
	{
		id: '1',
		type: 'text' as DiaryType,
		avatar: '/avatar.jpeg',
		author: 'zqqcee',
		date: '2026-01-03',
		content:
			'今天天气真好，去公园散步了一圈。看到樱花开了，很漂亮。\n\n## 下午的思考\n\n人生就像这樱花，短暂而美丽。要珍惜当下的每一刻。',
		images: [
			'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800',
			'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?w=800',
		],
		tags: ['生活', '散步', '摄影'],
		pin: true,
		likes: 5,
		commentsCount: 2,
		source: 'mock',
	},
	{
		id: '2',
		type: 'book' as DiaryType,
		avatar: '/avatar.jpeg',
		author: 'zqqcee',
		date: '2026-01-02',
		content:
			'刚刚读完这本书，非常震撼。马尔克斯的魔幻现实主义笔法让人着迷，布恩迪亚家族的百年孤独史就像一面镜子，映射出拉美乃至全人类的命运。',
		tags: ['读书', '文学', '小说'],
		pin: false,
		likes: 12,
		commentsCount: 5,
		source: 'mock',
		metadata: {
			bookTitle: '百年孤独',
			bookAuthor: '加西亚·马尔克斯',
			rating: 5,
			isbn: '9787544253994',
			coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
		} as BookMetadata,
	},
	{
		id: '3',
		type: 'movie' as DiaryType,
		avatar: '/avatar.jpeg',
		author: 'zqqcee',
		date: '2026-01-01',
		content:
			'周末重温了这部经典科幻片。诺兰的时间观念处理得太巧妙了，每次看都有新的感悟。父女之情的刻画也非常细腻动人。',
		tags: ['电影', '科幻', '经典'],
		pin: false,
		likes: 8,
		commentsCount: 3,
		source: 'mock',
		metadata: {
			movieTitle: '星际穿越',
			director: '克里斯托弗·诺兰',
			rating: 5,
			year: 2014,
			posterImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
		} as MovieMetadata,
	},
	{
		id: '4',
		type: 'link' as DiaryType,
		avatar: '/avatar.jpeg',
		author: 'zqqcee',
		date: '2025-12-31',
		content: '发现一篇很棒的技术文章，详细解析了 React 19 的新特性。Server Components 的设计理念很值得学习。',
		tags: ['技术', '前端', 'React'],
		pin: false,
		likes: 15,
		commentsCount: 7,
		source: 'mock',
		metadata: {
			url: 'https://react.dev/blog/2024/12/05/react-19',
			linkTitle: 'React 19 正式发布',
			linkDescription: 'React 19 现已在 npm 上发布！深入了解新特性、改进和突破性变化。',
			favicon: 'https://react.dev/favicon.ico',
		} as LinkMetadata,
	},
	{
		id: '5',
		type: 'text' as DiaryType,
		avatar: '/avatar.jpeg',
		author: 'zqqcee',
		date: '2025-12-30',
		content: '今天第一次尝试做咖啡拉花，虽然手法还很生疏，但看到杯子里的图案慢慢成型还是很有成就感的！',
		images: ['https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800'],
		tags: ['生活', '咖啡', '手作'],
		pin: false,
		likes: 6,
		commentsCount: 2,
		source: 'mock',
	},
	{
		id: '6',
		type: 'book' as DiaryType,
		avatar: '/avatar.jpeg',
		author: 'zqqcee',
		date: '2025-12-28',
		content:
			'这本书完全颠覆了我对编程的认识。函数式编程不仅仅是一种技术,更是一种思维方式。推荐给所有想要提升编程能力的朋友。',
		tags: ['读书', '技术', '编程'],
		pin: false,
		likes: 10,
		commentsCount: 4,
		source: 'mock',
		metadata: {
			bookTitle: 'JavaScript 函数式编程',
			bookAuthor: 'Luis Atencio',
			rating: 4,
			isbn: '9787115404084',
			coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
		} as BookMetadata,
	},
	{
		id: '7',
		type: 'text' as DiaryType,
		avatar: '/avatar.jpeg',
		author: 'zqqcee',
		date: '2025-12-26',
		content: '圣诞假期和朋友们一起去了滑雪场。虽然摔了好几次，但最后成功从中级道滑下来的那一刻，真的太爽了！',
		images: [
			'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
			'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800',
			'https://images.unsplash.com/photo-1526861326759-c6e0c1b3dcf4?w=800',
		],
		tags: ['运动', '滑雪', '假期'],
		pin: false,
		likes: 9,
		commentsCount: 3,
		source: 'mock',
	},
	{
		id: '8',
		type: 'movie' as DiaryType,
		avatar: '/avatar.jpeg',
		author: 'zqqcee',
		date: '2025-12-24',
		content:
			'平安夜看了这部动画电影，被深深感动了。新海诚的画风一如既往的唯美，故事也很温暖治愈。圣诞节最好的礼物。',
		tags: ['电影', '动画', '治愈'],
		pin: false,
		likes: 7,
		commentsCount: 2,
		source: 'mock',
		metadata: {
			movieTitle: '铃芽之旅',
			director: '新海诚',
			rating: 4,
			year: 2022,
			posterImage: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400',
		} as MovieMetadata,
	},
	{
		id: '9',
		type: 'text' as DiaryType,
		avatar: '/avatar.jpeg',
		author: 'zqqcee',
		date: '2025-12-22',
		content:
			'最近在学吉他，手指都磨出茧了。不过能弹出完整的曲子时，所有的辛苦都值得了。音乐真是一种神奇的语言。',
		tags: ['音乐', '吉他', '学习'],
		pin: false,
		likes: 4,
		commentsCount: 1,
		source: 'mock',
	},
	{
		id: '10',
		type: 'link' as DiaryType,
		avatar: '/avatar.jpeg',
		author: 'zqqcee',
		date: '2025-12-20',
		content:
			'看到一个很有意思的设计系统文档，Tailwind 团队对细节的把控真的很厉害。学到了很多关于设计 token 的知识。',
		tags: ['设计', '前端', '学习'],
		pin: false,
		likes: 11,
		commentsCount: 6,
		source: 'mock',
		metadata: {
			url: 'https://tailwindcss.com/docs',
			linkTitle: 'Tailwind CSS 官方文档',
			linkDescription: '一个功能完善的 CSS 框架，用于快速构建现代化网站。',
			favicon: 'https://tailwindcss.com/favicon.ico',
		} as LinkMetadata,
	},
];

/**
 * 获取日记列表（分页）
 * 当前使用 mock 数据，未来可替换为真实 API 调用
 *
 * 数据库接口预留：
 * - Endpoint: GET /api/diary?page=1&pageSize=5
 * - Response: { data: IDiary[], total: number, page: number, pageSize: number }
 */
export async function getDiaries(
	page: number = 1,
	pageSize: number = 5
): Promise<IDiaryListResponse> {
	// TODO: 替换为真实 API 调用
	// const url = new URL('diary', import.meta.env.PUBLIC_API);
	// url.search = new URLSearchParams({
	//   page: page.toString(),
	//   pageSize: pageSize.toString(),
	// }).toString();
	// const response = await fetch(url, { method: 'GET' });
	// return response.json();

	// 当前使用 mock 数据
	const sorted = [...MOCK_DIARIES].sort((a, b) => {
		// 置顶优先
		if (a.pin && !b.pin) return -1;
		if (b.pin && !a.pin) return 1;
		// 日期倒序（新的在前）
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const data = sorted.slice(start, end);

	return new Promise((resolve) =>
		setTimeout(() => {
			resolve({
				data,
				total: sorted.length,
				page,
				pageSize,
			});
		}, 1000)
	);
}

/**
 * 获取单条日记详情
 *
 * 数据库接口预留：
 * - Endpoint: GET /api/diary/:id
 * - Response: IDiary
 */
export async function getDiaryById(id: string): Promise<IDiary | null> {
	// TODO: 替换为真实 API 调用
	// const url = new URL(`diary/${id}`, import.meta.env.PUBLIC_API);
	// const response = await fetch(url, { method: 'GET' });
	// return response.json();

	return MOCK_DIARIES.find((d) => d.id === id) || null;
}

/**
 * 获取所有日记（用于生成静态页面）
 */
export async function getAllDiaries(): Promise<IDiary[]> {
	// TODO: 如果使用数据库，这里也需要调用 API
	return MOCK_DIARIES;
}
