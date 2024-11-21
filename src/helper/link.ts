export const linkDecoration = (url) => {
    if (!url || !url?.length) return '';
    return url?.includes('://') ? url : `https://${url}`
}