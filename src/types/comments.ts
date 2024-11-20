export interface IComment {
    id: number;
    pageId: string;
    parentId?: any;
    email: string;
    url: string;
    username: string;
    createdTime: string;
    approved: boolean;
    text: string;
    avatar: string
}
export interface IPostComment {
    pageId: string;
    parentId?: number;
    email: string;
    url?: string;
    username: string;
    text: string;
}
export const weekday = ['一', '二', '三', '四', '五', '六', '日']
