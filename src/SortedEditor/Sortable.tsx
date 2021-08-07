import {ReactNode, CSSProperties, HTMLAttributes} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

interface Props extends HTMLAttributes<HTMLDivElement> {
    id: string;
    children: ReactNode;
}

export default function Sortable({id, style, ...props}: Props) {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});
    const sortableStyle: CSSProperties = {
        ...style,
        transform: CSS.Transform.toString(transform),
        transition: transition ?? undefined,
    };

    return <div ref={setNodeRef} style={sortableStyle} {...attributes} {...listeners} {...props} />;
}
