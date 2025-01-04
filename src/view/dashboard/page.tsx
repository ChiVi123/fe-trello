import {
    Active,
    closestCorners,
    defaultDropAnimationSideEffects,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    DropAnimation,
    MouseSensor,
    Over,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { ICardEntity } from '~modules/card/entity';
import { IColumnEntity } from '~modules/column/entity';
import { mockData } from '~modules/mock-data';
import { mapOrder } from '~utils/sorts';
import Card from './components/card';
import Column from './components/column';

type ActiveDragItemType = 'column' | 'card';
type MoveCardToAnotherColumnParams = {
    active: Active;
    over: Over;
    activeCardId: UniqueIdentifier;
    activeCardData: ICardEntity;
    activeColumn: IColumnEntity;
    overCardId: UniqueIdentifier;
    overColumn: IColumnEntity;
};

const checkDragItemCard = (value: Record<string, unknown>): value is ICardEntity => 'columnId' in value;
const findColumnByCardId = (cardId: string, columns: IColumnEntity[]) => {
    return columns.find((column) => column.cards.map((card) => card._id).includes(cardId));
};

function DashboardPage() {
    const {
        board: { columnOrderIds, columns },
    } = mockData;
    const [orderedColumns, setOrderedColumns] = useState<typeof columns>([]);
    const [activeDragItemId, setActiveDragItemId] = useState<UniqueIdentifier | null>(null);
    const [activeDragItemType, setActiveDragItemType] = useState<ActiveDragItemType | null>(null);
    const [activeDragItemData, setActiveDragItemData] = useState<IColumnEntity | ICardEntity | null>(null);
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState<IColumnEntity | null>(null);

    // https://docs.dndkit.com/api-documentation/sensors
    // Require the mouse to move by 10 pixels before activating
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
    // Press delay of 250ms, with tolerance of 5px of movement
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } });
    // Better user experience in pc, tablet and mobile
    const sensors = useSensors(mouseSensor, touchSensor);

    const customDropAnimation: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    const moveCardToAnotherColumn = ({
        active: {
            rect: { current: activeRect },
        },
        over: { rect: overRect },
        activeCardId,
        activeCardData,
        activeColumn,
        overCardId,
        overColumn,
    }: MoveCardToAnotherColumnParams) => {
        const overCardIndex = overColumn.cards.findIndex((item) => item._id === overCardId);
        const isBelowOverItem = activeRect.translated && activeRect.translated.top > overRect.top + overRect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        const newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1;

        setOrderedColumns((prev) => {
            const nextColumns = cloneDeep(prev);
            const nextActiveColumn = nextColumns.find((item) => item._id === activeColumn._id);
            const nextOverColumn = nextColumns.find((item) => item._id === overColumn._id);

            if (nextActiveColumn) {
                nextActiveColumn.cards = nextActiveColumn.cards.filter((item) => item._id !== activeCardId);
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((item) => item._id);
            }
            if (nextOverColumn) {
                // if active exist in over card array, should remove it
                nextOverColumn.cards = nextOverColumn.cards.filter((item) => item._id !== activeCardId);
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
                    ...activeCardData,
                    columnId: nextOverColumn._id,
                } as ICardEntity);
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map((item) => item._id);
            }
            return nextColumns;
        });
    };

    useEffect(() => {
        setOrderedColumns(mapOrder(columns, columnOrderIds, '_id'));
    }, [columnOrderIds, columns]);

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const currentData = active.data.current;
        if (!currentData && typeof currentData !== 'object') return;

        setActiveDragItemId(active.id);
        setActiveDragItemType(checkDragItemCard(currentData) ? 'card' : 'column');
        setActiveDragItemData(currentData as ICardEntity | IColumnEntity);

        if (checkDragItemCard(currentData)) {
            setOldColumnWhenDraggingCard(findColumnByCardId(active.id as string, orderedColumns) || null);
        }
    };
    const handleDragOver = (event: DragOverEvent) => {
        if (activeDragItemType === 'column') return;

        const { active, over } = event;

        if (!over) return;

        const {
            id: activeDraggingCardId,
            data: { current: activeDraggingCardData },
        } = active;
        const { id: overCardId } = over;
        const activeColumn = findColumnByCardId(activeDraggingCardId as string, orderedColumns);
        const overColumn = findColumnByCardId(overCardId as string, orderedColumns);

        if (!activeColumn || !overColumn) return;
        if (activeColumn._id === overColumn._id) return;

        moveCardToAnotherColumn({
            active,
            over,
            activeCardId: activeDraggingCardId,
            activeCardData: activeDraggingCardData as ICardEntity,
            activeColumn,
            overCardId,
            overColumn,
        });
    };
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        if (activeDragItemType === 'card') {
            const {
                id: activeCardId,
                data: { current: activeCardData },
            } = active;
            const { id: overCardId } = over;
            const activeColumn = findColumnByCardId(activeCardId as string, orderedColumns);
            const overColumn = findColumnByCardId(overCardId as string, orderedColumns);

            if (!activeColumn || !overColumn) return;

            if (oldColumnWhenDraggingCard?._id !== overColumn._id) {
                moveCardToAnotherColumn({
                    active,
                    over,
                    activeCardId,
                    activeCardData: activeCardData as ICardEntity,
                    activeColumn,
                    overCardId,
                    overColumn,
                });
            } else {
                const oldCardIndex = oldColumnWhenDraggingCard.cards.findIndex((item) => item._id === activeDragItemId);
                const newCardIndex = overColumn.cards.findIndex((item) => item._id === overCardId);
                const newOrderedCards = arrayMove(oldColumnWhenDraggingCard.cards, oldCardIndex, newCardIndex);

                setOrderedColumns((prev) => {
                    const nextColumns = cloneDeep(prev);
                    const targetColumn = nextColumns.find((item) => item._id === overColumn._id);

                    if (!targetColumn) return nextColumns;

                    targetColumn.cards = newOrderedCards;
                    targetColumn.cardOrderIds = newOrderedCards.map((item) => item._id);

                    return nextColumns;
                });
            }
        }

        if (activeDragItemType === 'column' && active.id !== over.id) {
            const oldColumnIndex = orderedColumns.findIndex((item) => item._id === active.id);
            const newColumnIndex = orderedColumns.findIndex((item) => item._id === over.id);
            const newOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex);
            setOrderedColumns(newOrderedColumns);
            // handle API
            // const newColumnOrderIds = newOrderedColumns.map((item) => item._id);
            // console.log('handleDragEnd::', newColumnOrderIds);
        }

        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
        setOldColumnWhenDraggingCard(null);
    };

    return (
        <DndContext
            sensors={sensors}
            // https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    bgcolor: 'inherit',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    '&::-webkit-scrollbar-track': { m: 2 },
                }}
            >
                <SortableContext
                    items={orderedColumns.map((item) => item._id)}
                    strategy={horizontalListSortingStrategy}
                >
                    {orderedColumns.map((item) => (
                        <Column key={item._id} data={item} />
                    ))}

                    <DragOverlay dropAnimation={customDropAnimation}>
                        {!activeDragItemData && null}

                        {activeDragItemData && checkDragItemCard(activeDragItemData) && (
                            <Card data={activeDragItemData} />
                        )}
                        {activeDragItemData && !checkDragItemCard(activeDragItemData) && (
                            <Column data={activeDragItemData} />
                        )}
                    </DragOverlay>
                </SortableContext>

                <Box
                    sx={{
                        minWidth: '200px',
                        maxWidth: '200px',
                        height: 'fit-content',
                        mx: 2,
                        borderRadius: '6px',
                        bgcolor: '#ffffff3d',
                    }}
                >
                    <Button
                        fullWidth
                        startIcon={<NoteAddIcon />}
                        sx={{ justifyContent: 'flex-start', pl: 2.5, py: 1, color: 'white' }}
                    >
                        Add new column
                    </Button>
                </Box>
            </Box>
        </DndContext>
    );
}

export default DashboardPage;
