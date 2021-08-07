import {ReactNode, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import SortableContainer from './SortableContainer';
import Item from './Item';
import Appender from './Appender';

const Layout = styled.div`
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-template-rows: 30px;
    grid-auto-columns: max-content;
    grid-column-gap: 4px;
`;

interface Props<T, K extends string | number> {
    value: K[];
    dataSource: T[];
    fallbackItem: (value: K) => T;
    resolveValue: (item: T) => K;
    renderItem: (item: T) => ReactNode;
    onChange: (value: K[]) => void;
}

export default function SortedEditor<T, K extends string | number>(props: Props<T, K>) {
    const {value, dataSource, fallbackItem, resolveValue, renderItem, onChange} = props;
    const unusedDataSource = useMemo(() => dataSource.filter((i) => !value.includes(resolveValue(i))), [
        dataSource,
        value,
        resolveValue,
    ]);
    const create = useCallback(
        (created: K) => {
            onChange([...value, created]);
        },
        [value, onChange]
    );
    const remove = useCallback(
        (removed: K) => {
            onChange(value.filter((v) => v !== removed));
        },
        [value, onChange]
    );
    const sort = useCallback(
        (fromIndex: number, toIndex: number) => {
            const movingItem = value[fromIndex];
            const itemRemoved = [...value.slice(0, fromIndex), ...value.slice(fromIndex + 1)];
            const itemInserted = [...itemRemoved.slice(0, toIndex), movingItem, ...itemRemoved.slice(toIndex)];
            onChange(itemInserted);
        },
        [value, onChange]
    );
    const renderDisplayItem = (value: K) => {
        const item = dataSource.find((v) => resolveValue(v) === value) ?? fallbackItem(value);

        return (
            <Item key={resolveValue(item)} value={resolveValue(item)} onDelete={remove}>
                {renderItem(item)}
            </Item>
        );
    };

    return (
        <Layout>
            <SortableContainer items={value.map((v) => v.toString())} onSort={sort}>
                {value.map(renderDisplayItem)}
                <Appender
                    dataSource={unusedDataSource}
                    resolveValue={resolveValue}
                    renderItem={renderItem}
                    onSelect={create}
                />
            </SortableContainer>
        </Layout>
    );
}
