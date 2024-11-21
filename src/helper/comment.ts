export const arrToTree = (arr: Array<Object>, key: string, parentKey: string) => {
    const result = []
    const map = {}
    arr.filter(a => !a[parentKey]).forEach(a => {
        map[a[key]] = { ...a, children: [] }
        result.push(map[a[key]])
    })
    arr.filter(a => a[parentKey]).forEach((a) => {
        map[a[parentKey]].children.push(a)
    })
    return result
}