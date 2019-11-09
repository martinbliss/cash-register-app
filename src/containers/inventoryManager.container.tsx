import React from "react";
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

const Label = styled.label`
    color: white;
    text-align: left;
`;

const Row = ({ item, onChange }: RowProps) => {
    const { key, description, image, price } = item;

    const handleChange = (field = '') => (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...item, [field]: e.target.value });
    const handleCurrencyChange = (field = '') => (value: number) => onChange({ ...item, [field]: value });

    return <tr>
        <Label>{key}</Label>
        <td><input type="text" value={description} onChange={handleChange('description')} /></td>
        <td><input type="text" value={image} onChange={handleChange('image')} /></td>
        <td><CurrencyInput value={price} onChange={handleCurrencyChange('price')} ariaLabel={`${key}-price`} /></td>
    </tr>
}

export const InventoryManagerContainerComponent = ({ }: Props) => {

    const rows = Object.keys(Inventory).map(key => ({ key, ...Inventory[key] })).map((item, index) =>
        <Row item={item} key={index} onChange={changedItem => Inventory[item.key] = changedItem} />
    );

    return <Container>
        <table>
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
        </table>
    </Container>;
}

export const InventoryManagerContainer = InventoryManagerContainerComponent;