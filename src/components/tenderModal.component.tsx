import React, { useState } from 'react';
import styled from 'styled-components';
import { TenderInput } from './tenderInput.component';
import { CurrencyInput } from './currencyInput.component';

interface Props {
    total: number;
    onConfirm: (amount: number) => void;
    onCancel: () => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: #d35400;
    color: #ecf0f1;
    padding: 64px 32px;
    font-size: 32px;
    transform: translate(-50%,-50%);

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
    flex-direction: column;
`;

const Button = styled.button`
    font-size: 32px;
    margin: 32px 0 0 0;
    cursor: pointer;
`;

export const TenderModal = ({ total = 0, onConfirm, onCancel }: Props) => {
    const [amount, setAmount] = useState(0);

    return <Container>
        <Row>
            Total: ${total}
        </Row>
        <Row>
            Tender Amount:
            <CurrencyInput value={amount} onChange={setAmount} ariaLabel="tender-amount" />
        </Row>
        <RowColumn>
            <Button onClick={() => onConfirm(amount)} disabled={amount < total}>Confirm</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </RowColumn>
    </Container>;
}