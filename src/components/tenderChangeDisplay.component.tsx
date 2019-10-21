import React from 'react';
import styled from 'styled-components';
import { CurrencyInput } from './currencyInput.component';

export interface TenderChangeAmount {
    total: number;
    denominations: {
        [key: string]: {
            caption: string;
            count: number;
        }
    }
};

interface Props {
    changeAmount: TenderChangeAmount;
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

export const TenderChangeDisplay = ({ changeAmount }: Props) => {
    const { total, denominations } = changeAmount;

    const amountElements = Object.keys(denominations).map(key => denominations[key])
        .map((denomination, index) => <DenominationRow key={index}>
            {/* <Image src={require(`../images/${denomination.image}`)} /> */}
            <div>
                <label>{denomination.caption}</label>
            </div>
            <DenominationContent>
                {denomination.count}
            </DenominationContent>
        </DenominationRow>);

    return <Container>
        <div>
            Change Amount: <CurrencyInput disabled value={total} />
        </div>
        <div>
            Denominations:
                    <DenominationContainer>
                {amountElements}
            </DenominationContainer>
        </div>
    </Container>;
}