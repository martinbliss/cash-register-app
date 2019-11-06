import React from 'react';
import { InventoryItem } from "../util/inventory.service";
import styled from 'styled-components';

interface Props {
    item: InventoryItem;
}

const Bar = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;    
`;

const ValueCell = styled.div`
    flex-grow: 1;
`;

export const InventoryListItemComponent = ({ item }: Props) => {
    return <Bar>
        <Row>
            <div>Description:</div>
            <ValueCell>
                {item.description}
            </ValueCell>
        </Row>
        <Row>
            <div>Price:</div>
            <ValueCell>
                {item.price}
            </ValueCell>
        </Row>
        <Row>
            <div>Image:</div>
            <ValueCell>
                {item.image}
            </ValueCell>
        </Row>
    </Bar>;
}

export const InventoryListItem = InventoryListItemComponent;