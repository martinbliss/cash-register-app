import React, { useState } from "react";
import styled from "styled-components";
import { Inventory, InventoryItem } from "../util";
import { CurrencyInput } from "../components";

interface Props {

}

interface RowProps {
    item: InventoryItem & { key: string };
    onChange: (item: InventoryItem) => void;
}

const Container = styled.div`
    font-size: 24px;
    
    input {
        font-size: 24px;
    }
`;

const Table = styled.table`
    margin: 64px auto;

    th {
        color: #e67e22;
    }
`;

const Label = styled.label`
    color: white;
    text-align: left;
    display: block;
    padding: 6px 18px;
`;

const Row = ({ item, onChange }: RowProps) => {
    const { key, description, image, price } = item;

    const handleChange = (field: keyof InventoryItem) => (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...item, [field]: e.target.value });
    const handleCurrencyChange = (field: keyof InventoryItem) => (value: number) => onChange({ ...item, [field]: value });

    return <tr>
        <Label>{key}</Label>
        <td><input type="text" value={description} onChange={handleChange('description')} /></td>
        <td><input type="text" value={image} onChange={handleChange('image')} /></td>
        <td><CurrencyInput value={price} onChange={handleCurrencyChange('price')} ariaLabel={`${key}-price`} /></td>
    </tr>
}

export const InventoryManagerContainerComponent = ({ }: Props) => {

    const [inventory, setInventory] = useState(Inventory);

    const rows = Object.keys(inventory).map(key => ({ key, ...Inventory[key] })).map((item, index) =>
        <Row item={item} key={index} onChange={changedItem => {
            Inventory[item.key] = changedItem;
            setInventory({ ...Inventory }); // Even though we're updating the Inventory config, we need to change component state to cause a re-render.
        }} />
    );

    return <Container>
        <Table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>URL</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    </Container>;
}

export const InventoryManagerContainer = InventoryManagerContainerComponent;