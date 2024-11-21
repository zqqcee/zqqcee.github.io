import { z } from 'zod'
export const getComments = async (pageId: string) => {
    const url = new URL(
        `comments`,
        import.meta.env.PUBLIC_API
    );
    url.search = new URLSearchParams({
        pageId,
    }).toString();

    const response = await fetch(url, {
        method: "GET",
    });
    const resObject = await response.json();
    return resObject.data;
}

const formSchema = z.object({
    email: z.string(),
    url: z.string().optional(),
    username: z.string().max(50),
    text: z.string(),
    pageId: z.string(),
    parentId: z.number().optional(),
});


export const postComments = async (comment: z.infer<typeof formSchema>) => {
    const url = new URL(
        `comments`,
        import.meta.env.PUBLIC_API
    );
    console.log(comment)
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify(comment),
    }).catch(e => {
        console.log(e)
    });
    const resObject = await response.json();
    console.log(resObject)
    return resObject.data;

}