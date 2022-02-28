export default function buildDataList(data: Record<string, any>) {
    const keys = Object.keys(data);
    const list = Object.keys((data as Record<string, any>)[keys[0]]);
    const items: any[] = [];

    list.forEach((_, i) => {
        const item: Record<string, any> = {};
        for(let key of keys) {
            item[key] = (data as Record<string, any>)[key][i];
        }

        items.push(item);
    })

    return items;
}