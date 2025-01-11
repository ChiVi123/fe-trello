import { MouseSensor as DndKitMouseSensor, TouchSensor as DndKitTouchSensor } from '@dnd-kit/core';
import { MouseEvent, TouchEvent } from 'react';

// https://github.com/clauderic/dnd-kit/issues/477#issuecomment-1713536492
// Block DnD event propagation if element have "data-no-dnd" attribute
const handler = ({ nativeEvent: event }: MouseEvent | TouchEvent) => {
    let cur = event.target as HTMLElement;

    while (cur) {
        if (cur.dataset && cur.dataset.noDnd) return false;
        cur = cur.parentElement as HTMLElement;
    }

    return true;
};

export class MouseSensor extends DndKitMouseSensor {
    static activators = [{ eventName: 'onMouseDown', handler }] as (typeof DndKitMouseSensor)['activators'];
}
export class TouchSensor extends DndKitTouchSensor {
    static activators = [{ eventName: 'onTouchStart', handler }] as (typeof DndKitTouchSensor)['activators'];
}
