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


export const postComments = async (pageId: string) => { }