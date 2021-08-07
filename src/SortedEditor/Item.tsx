import {ReactNode, useCallback} from 'react';
import styled from 'styled-components';
import {useHover} from '@huse/hover';
import {FaTimes, FaArrowRight} from 'react-icons/fa';
import Sortable from './Sortable';

const DeleteSign = styled(FaTimes)`
    cursor: pointer;
`;

const Layout = styled(Sortable)`
    display: inline-flex;
    align-items: center;
    padding: 0 4px;
    border: 1px solid transparent;
    cursor: move;

    &:hover {
        border: 1px dashed #999;
    }
`;

const Label = styled.span`
    margin-right: 8px;
`;

interface Props<K> {
    value: K;
    children: ReactNode;
    onDelete: (value: K) => void;
}

export default function Item<K extends string | number>({value, children, onDelete}: Props<K>) {
    const requestDelete = useCallback(() => onDelete(value), [value, onDelete]);
    const [isHover, hoverListeners] = useHover();

    return (
        <Layout id={value.toString()} {...hoverListeners}>
            <Label>{children}</Label>
            {isHover ? <DeleteSign onClick={requestDelete} /> : <FaArrowRight />}
        </Layout>
    );
}
