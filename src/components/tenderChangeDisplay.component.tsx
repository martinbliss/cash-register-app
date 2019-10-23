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

const emptyChangeAmountValue: TenderChangeAmount = { balance: 0, denominations: {} };

export const TenderChangeDisplay = ({ changeAmount = emptyChangeAmountValue }: Props) => {
    const { balance = 0, denominations = {} } = changeAmount;

    const amountElements = Object.keys(denominations).map(key => ({ key, ...denominations[key] }))
        .map((denomination, index) => <DenominationRow key={index}>
            <div>
                <label>{denomination.caption}</label>
            </div>
            <DenominationContent data-testid={denomination.key}>
                {denomination.count}
            </DenominationContent>
        </DenominationRow>);

    return <Container>
        <div>
            Change Amount: <CurrencyInput disabled value={balance} data-testid="change-due" />
        </div>
        <div>
            <DenominationContainer>
                {amountElements}
            </DenominationContainer>
        </div>
    </Container>;
}