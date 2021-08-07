import {ReactNode, useCallback} from 'react';
import styled from 'styled-components';
import {Select} from 'antd';

const NoAvailable = styled.span`
    color: #999;
    cursor: not-allowed;
`;

interface Props<T, K extends string | number> {
    dataSource: T[];
    resolveValue: (item: T) => K;
    renderItem: (item: T) => ReactNode;
    onSelect: (value: K) => void;
}

export default function Appender<T, K extends string | number>(props: Props<T, K>) {
    const {dataSource, resolveValue, renderItem, onSelect} = props;
    const select = useCallback(
        (value: any) => {
            const [sample] = dataSource;
            if (typeof value === typeof resolveValue(sample)) {
                onSelect(value);
            } else {
                throw new Error(`Unexpected value ${value}`);
            }
        },
        [dataSource, onSelect, resolveValue]
    );

    if (!dataSource.length) {
        return <NoAvailable>无可追加项</NoAvailable>;
    }

    const renderOption = (item: T) => {
        const value = resolveValue(item);

        return (
            <Select.Option key={value} value={value}>
                {renderItem(item)}
            </Select.Option>
        );
    };

    return (
        <Select key={dataSource.length} style={{width: 120}} placeholder="添加……" onChange={select}>
            {dataSource.map(renderOption)}
        </Select>
    );
}
