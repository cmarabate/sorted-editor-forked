import {useState} from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.min.css';
import SortedEditor from './SortedEditor';

interface ItemInfo {
    label: string;
    valueX: string;
}

const items: ItemInfo[] = [
    {label: '123', valueX: '123'},
    {label: '456', valueX: '456'},
    {label: '789', valueX: '789'},
    {label: 'abc', valueX: 'abc'},
    {label: 'xyz', valueX: 'xyz'},
];
const selected = ['123', 'abc'];
const resolveValue = (item: ItemInfo) => item.valueX;
const renderItem = (item: ItemInfo) => <>Item: {item.label}</>;
const fallbackItem = (value: string): ItemInfo => ({valueX: value, label: '未知'});

const Root = styled.div`
    margin: 40px;
`;

export default function App() {
    const [value, setValue] = useState(selected);
    return (
        <Root>
            <SortedEditor
                renderItem={renderItem}
                resolveValue={resolveValue}
                fallbackItem={fallbackItem}
                value={value}
                dataSource={items}
                onChange={setValue}
            />
        </Root>
    );
}
