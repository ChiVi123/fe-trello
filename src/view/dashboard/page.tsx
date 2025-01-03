import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { mockData } from '~modules/mock-data';
import { mapOrder } from '~utils/sorts';
import Column from './components/column';

function DashboardPage() {
    const {
        board: { columnOrderIds, columns },
    } = mockData;
    const [orderedColumns, setOrderedColumns] = useState<typeof columns>([]);
    // https://docs.dndkit.com/api-documentation/sensors
    // Require the mouse to move by 10 pixels before activating
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
    // Press delay of 250ms, with tolerance of 5px of movement
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } });

    // Better user experience in pc, tablet and mobile
    const sensors = useSensors(mouseSensor, touchSensor);

    useEffect(() => {
        setOrderedColumns(mapOrder(columns, columnOrderIds, '_id'));
    }, [columnOrderIds, columns]);

    const handleDragEnd = (event: DragEndEvent) => {
        console.log('handleDragEnd::', event);

        const { active, over } = event;
        if (!over) return;
        if (active.id === over.id) return;

        const oldIndex = orderedColumns.findIndex((item) => item._id === active.id);
        const newIndex = orderedColumns.findIndex((item) => item._id === over.id);
        const newOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
        setOrderedColumns(newOrderedColumns);
        // handle API
        // const newColumnOrderIds = newOrderedColumns.map((item) => item._id);
        // console.log('handleDragEnd::', newColumnOrderIds);
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
