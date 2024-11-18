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
}
