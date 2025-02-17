import debounce from 'lodash/debounce';
import { useCallback } from 'react';
/**
 * https://trippingoncode.com/react-debounce-hook/
 * https://lodash.com/docs/4.17.15#debounce
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounceFn = (fnToDebounce: (...args: any[]) => any, delay: number = 500) => {
    if (isNaN(delay)) {
        throw new Error('Delay value should be a number.');
    }
    if (!fnToDebounce || typeof fnToDebounce !== 'function') {
        throw new Error('Debounce must have a function');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(debounce(fnToDebounce, delay), [fnToDebounce, delay]);
};
