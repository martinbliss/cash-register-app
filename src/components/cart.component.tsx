import React, { useMemo } from 'react';
import _ from 'lodash';
import { Item } from './inventoryBar.component';
import styled from 'styled-components';
import { CurrencyInput } from './currencyInput.component';

interface Props {
    items: Item[];
    taxRate?: number;
}


const Container = styled.div`
    font-size: 32px;
    background-color: white;
    border: 1px solid black;
    flex: 1;
    color: black;
    display: flex;
    flex-direction: column;
    padding: 8px 32px;
`;

const ItemRow = styled.div`
    display: flex;
    flex-grow: 1;
    padding: 8px 0;
`;

const DescriptionPart = styled.div`
    flex-grow: 1;
    text-align: left;
    display: inline-block;
`;

const PricePart = styled.div`
    text-align: right;
    display: inline-block;
`;

export const CartComponent = ({ items, taxRate = 0 }: Props) => {
    const rows = useMemo(() => items.map((item, index) => <ItemRow key={index}>
        <DescriptionPart>{item.description}</DescriptionPart>
        <PricePart><CurrencyInput value={item.price} disabled /></PricePart>
    </ItemRow>), [items]);

    const subTotal = useMemo(() => _.sum(items.map(i => i.price)), [items]);

    const tax = subTotal * taxRate;
    const total = subTotal + tax;

    return <Container>
        {rows}
        <ItemRow>
            <DescriptionPart>Sub-Total</DescriptionPart>
            <PricePart><CurrencyInput value={subTotal} disabled /></PricePart>
        </ItemRow>
        <ItemRow>
            <DescriptionPart>Tax ({taxRate * 100}%)</DescriptionPart>
            <PricePart><CurrencyInput value={tax} disabled /></PricePart>
        </ItemRow>
        <ItemRow>
            <DescriptionPart><b>Total</b></DescriptionPart>
            <PricePart><b><CurrencyInput value={total} disabled /></b></PricePart>
        </ItemRow>
    </Container>;
}

export const Cart = CartComponent;