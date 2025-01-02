export const capitalizeFirstLetter = (val: string | undefined | null) => {
    if (!val) return '';
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};
