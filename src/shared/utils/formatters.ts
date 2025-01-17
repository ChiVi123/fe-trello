import { ICardEntity } from '~modules/card/entity';
import { IColumnEntity } from '~modules/column/entity';

export const capitalizeFirstLetter = (val: string | undefined | null) => {
    if (!val) return '';
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};
export const generatePlaceholderCard = (column: IColumnEntity): ICardEntity => ({
    _id: column._id + '-placeholder-card',
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true,
});

// css pointer-event prevent user spam click call api
// With Axios Interceptors handle a whole project
// Guide: add class "interceptor-loading" for elements.
export const interceptorLoadingElements = (calling: boolean) => {
    const elements = document.querySelectorAll('.interceptor-loading') as NodeListOf<HTMLElement>;
    elements.forEach((element) => {
        if (calling) {
            // if call API pending (calling === true)
            element.style.opacity = '0.5';
            element.style.pointerEvents = 'none';
        } else {
            element.style.opacity = 'initial';
            element.style.pointerEvents = 'initial';
        }
    });
};
