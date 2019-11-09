import React, { useMemo } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { CurrencyInput } from './currencyInput.component';
import Decimal from 'decimal.js';
import { InventoryItem } from '../util';

Decimal.set({ precision: 5, rounding: 2 });

interface Props {
    items: InventoryItem[];
    taxRate?: Decimal.Value;
    tax: Decimal.Value;
    subTotal: Decimal.Value;
    total: Decimal.Value;
}

const Container = styled.div`
    flex-grow: 1;
`;

const InnerContainer = styled.div`
    font-size: 32px;
    background-color: #ecf0f1;
    border: 1px solid #2c3e50;
    flex: 1;
    color: #2c3e50;
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
    margin-right: 12px;
`;

const PricePart = styled.div`
    text-align: right;
    display: inline-block;
    margin-left: 12px;
`;

const CartLabel = styled.label`
    font-size: 32px;
    color: white;
`;

export const CartComponent = ({ items, taxRate = '0', subTotal, tax, total }: Props) => {
    const rows = useMemo(() => items.map((item, index) => <ItemRow key={index}>
        <DescriptionPart>{item.description}</DescriptionPart>
        <PricePart><CurrencyInput value={item.price} disabled /></PricePart>
    </ItemRow>), [items]);

    return <Container>
        <CartLabel>Checkout Cart</CartLabel>
        <InnerContainer>
            {rows}
            <ItemRow>
                <DescriptionPart>Sub-Total</DescriptionPart>
                <PricePart><CurrencyInput value={subTotal} disabled /></PricePart>
            </ItemRow>
            <ItemRow>
                <DescriptionPart>Tax ({taxRate}%)</DescriptionPart>
                <PricePart><CurrencyInput value={tax} disabled /></PricePart>
            </ItemRow>
            <ItemRow>
                <DescriptionPart><b>Total</b></DescriptionPart>
                <PricePart><b><CurrencyInput value={total} disabled /></b></PricePart>
            </ItemRow>
        </InnerContainer>
    </Container>;
}

export const Cart = CartComponent;