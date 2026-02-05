export interface MomentImage {
	url: string;
	width: number;
	height: number;
	blurhash?: string;
}

export interface Moment {
	id: string;
	content: string;
	images: MomentImage[];
	tags: string[];
	visibility: 'public' | 'private' | 'unlisted';
	createdAt: Date;
	updatedAt: Date;
}

// API 响应类型（匹配后端格式）
export interface MomentListResponse {
	code: number;
	msg: string;
	data: {
		items: Moment[];
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasMore: boolean;
	};
}

export interface MomentListParams {
	page?: number;
	limit?: number;
	visibility?: 'public' | 'private' | 'unlisted';
}
