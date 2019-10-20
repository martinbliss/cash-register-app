import React from 'react';
import InventoryConfig from '../config/inventory.json';
import styled from 'styled-components';

const resolveImagePath = (imageName: string) => require(`../images/${imageName}`);

export type InventoryMap = { [key: string]: Item };

export interface Item {
    description: string;
    price: number;
    image: string;
}

interface Props {
    onItemSelected: (item: Item) => void;
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

    const items = Object.keys(InventoryConfig)
        .map(key => (InventoryConfig as InventoryMap)[key])
        .map((item, index) => <Button key={index} onClick={() => onItemSelected(item)}><Image alt={item.description} src={resolveImagePath(item.image)} /></Button>);

    return <Container>{items}</Container>;
}

export const InventoryBar = InventoryBarComponent;