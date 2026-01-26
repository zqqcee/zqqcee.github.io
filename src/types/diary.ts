// Diary 类型枚举
export enum DiaryType {
	TEXT = 'text', // 普通文本日记
	BOOK = 'book', // 读书记录
	MOVIE = 'movie', // 观影记录
	PHOTO = 'photo', // 相册/照片集
	LINK = 'link', // 链接分享
	MUSIC = 'music', // 音乐推荐
}

// 读书记录元数据
export interface BookMetadata {
	bookTitle: string; // 书名
	bookAuthor: string; // 作者
	rating?: number; // 评分 (1-5)
	isbn?: string; // ISBN
	coverImage?: string; // 封面图
}

// 观影记录元数据
export interface MovieMetadata {
	movieTitle: string; // 电影名
	director: string; // 导演
	rating?: number; // 评分 (1-5)
	year?: number; // 年份
	posterImage?: string; // 海报图
}

// 链接分享元数据
export interface LinkMetadata {
	url: string; // 链接地址
	linkTitle: string; // 链接标题
	linkDescription?: string; // 链接描述
	favicon?: string; // 网站图标
}

// 音乐推荐元数据
export interface MusicMetadata {
	songTitle: string; // 歌名
	artist: string; // 艺术家
	album?: string; // 专辑
	coverImage?: string; // 封面图
	spotifyUrl?: string; // Spotify 链接
}

// 联合类型
export type DiaryMetadata = BookMetadata | MovieMetadata | LinkMetadata | MusicMetadata | null;

// Diary 完整接口
export interface IDiary {
	id: string;
	avatar: string;
	author: string;
	date: string; // ISO 8601 格式 (YYYY-MM-DD)
	content: string; // 支持 markdown
	images?: string[];
	tags?: string[];
	pin?: boolean;
	likes?: number;
	commentsCount?: number;
	source?: 'mock' | 'db';
	// 新增字段
	type: DiaryType;
	metadata?: DiaryMetadata;
}

// 分页响应数据结构
export interface IDiaryListResponse {
	data: IDiary[];
	total: number;
	page: number;
	pageSize: number;
}
