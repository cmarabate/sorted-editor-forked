import {ReactNode, useCallback} from 'react';
import {DndContext, DragEndEvent, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';

interface Props {
    items: string[];
    children: ReactNode[];
    onSort: (fromIndex: number, toIndex: number) => void;
}

export default function SortableContainer({children, items, onSort}: Props) {
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5,
        },
    });
    const sensors = useSensors(pointerSensor);
    const finishSort = useCallback(
        (e: DragEndEvent) => {
            const fromIndex = e.active.data.current?.sortable.index;
            const toIndex = e.over?.data.current?.sortable.index;

            if (fromIndex === undefined || toIndex === undefined) {
                return;
            }

            onSort(fromIndex, toIndex);
        },
        [onSort]
    );

    return (
        <DndContext onDragEnd={finishSort} sensors={sensors}>
            <SortableContext items={items}>{children}</SortableContext>
        </DndContext>
    );
}
