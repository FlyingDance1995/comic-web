export const uniqByKeepFirst = (arr, key) => {
    let seen = new Set();
    return arr.filter((item) => {
        let k = key(item);
        return seen.has(k) ? false : seen.add(k);
    });
}

export const uniqByKeepLast = (arr, key) => {
    return [
        ...new Map(
            arr.map((x) => [key(x), x])
        ).values()
    ]
}
