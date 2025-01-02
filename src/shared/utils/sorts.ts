// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapOrder = <T extends Record<string, any>>(
    originalArray: T[],
    orderArray: string[],
    key: keyof T
): T[] => {
    if (!originalArray || !orderArray || !key) return [];

    const clonedArray = [...originalArray];
    const orderedArray = clonedArray.sort((a, b) => {
        return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
    });

    return orderedArray;
};
