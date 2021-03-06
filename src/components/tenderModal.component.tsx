import React, { useState } from 'react';
import styled from 'styled-components';
import { TenderInput } from './tenderInput.component';
import { CurrencyInput } from './currencyInput.component';
import Decimal from 'decimal.js';

interface Props {
    total: Decimal.Value;
    onConfirm: (amount: number) => void;
    onCancel: () => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: #282c34;
    color: #ecf0f1;
    padding: 64px 32px;
    font-size: 32px;
    transform: translate(-50%,-50%);
    border: 2px solid black;

    input {
        margin-left: 12px;
        font-size: 32px;
    }
`;

const Row = styled.div`
    display: flex;    
`;

const RowColumn = styled.div`
    display: flex;
    // flex-direction: column;
`;

const Button = styled.button`
    font-size: 32px;
    margin: 16px;
    padding: 8px 16px;
    cursor: pointer;
`;

export const TenderModal = ({ total = '0', onConfirm, onCancel }: Props) => {
    const [amount, setAmount] = useState(0);

    return <Container>
        <form>
            <Row>
                Total:
            <CurrencyInput disabled value={total} ariaLabel="tender-total" />
            </Row>
            <Row>
                Tender Amount:
            <CurrencyInput value={amount} onChange={setAmount} ariaLabel="tender-amount" />
            </Row>
            <RowColumn>
                <Button type="submit" onClick={() => onConfirm(amount)} disabled={new Decimal(amount).lessThan(total)}>Confirm</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </RowColumn>
        </form>
    </Container>;
}