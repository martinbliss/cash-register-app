import React from 'react';
import styled from 'styled-components';
import { CurrencyInput } from './currencyInput.component';

export interface TenderChangeAmount {
    balance: number;
    denominations: {
        [key: string]: {
            caption: string;
            count: number;
        }
    }
};

interface Props {
    changeAmount?: TenderChangeAmount;
}

const Container = styled.div`
    font-size: 32px;
`;

const Image = styled.img`
    width: 124px;
    height: 124px;
`;

const DenominationContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const DenominationRow = styled.div`
    display: flex;
    flex-wrap: nowrap;
    margin: 12px 0;
`;

const DenominationContent = styled.div`
    flex-grow: 1;    
    text-align: right;
    margin: auto 24px;
    border-bottom: 1px dashed white;
`;

const Label = styled.label`
    color: white;
`;

const emptyChangeAmountValue: TenderChangeAmount = { balance: 0, denominations: {} };

export const TenderChangeDisplay = ({ changeAmount = emptyChangeAmountValue }: Props) => {
    const { balance = 0, denominations = {} } = changeAmount;

    const amountElements = Object.keys(denominations).map(key => ({ key, ...denominations[key] }))
        .map((denomination, index) => <DenominationRow key={index}>
            <div>
                <Label>{denomination.caption}</Label>
            </div>
            <DenominationContent data-testid={denomination.key}>
                <Label>{denomination.count}</Label>
            </DenominationContent>
        </DenominationRow>);

    return <Container>
        <Label>
            Change Amount: <CurrencyInput disabled value={balance} data-testid="change-due" />
        </Label>
        <div>
            <DenominationContainer>
                {amountElements}
            </DenominationContainer>
        </div>
    </Container>;
}