import React from 'react';
import styled from 'styled-components';
import path from 'path';
import { Inventory, InventoryItem } from '../util';

const resolveImagePath = (imageName: string) => {
    if (imageName.startsWith('http')) {
        return imageName;
    } else {
        return require(`../images/${imageName}`);
    }
}

interface Props {
    onItemSelected: (item: InventoryItem) => void;
}

const Button = styled.button`
`;

const Container = styled.div`
    flex: 1;    
`;

const Image = styled.img`
    width: 124px;
    height: 124px;
`;

export const InventoryBarComponent = ({ onItemSelected }: Props) => {

    const items = Object.keys(Inventory)
        .map(key => Inventory[key])
        .map((item, index) => <Button key={index} onClick={() => onItemSelected(item)}><Image alt={item.description} src={resolveImagePath(item.image)} /></Button>);

    return <Container>{items}</Container>;
}

export const InventoryBar = InventoryBarComponent;