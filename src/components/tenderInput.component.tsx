import React, { useState } from 'react';
import styled from 'styled-components';
import { CurrencyInput } from './currencyInput.component';

interface Props {
    onTender: (amount: number) => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;

    input {
        font-size: 32px;
    }
`;

const TenderLabel = styled.span`
    font-size: 32px;
    text-align: left;
`;

const Button = styled.button`
    font-size: 18px;    
`;

export const TenderInputComponent = ({ onTender }: Props) => {
    const [amount, setAmount] = useState(0);

    const handleClick = () => {
        onTender(amount);
    }

    return (
        <Container>
            <TenderLabel>
                Tender Amount:
                <CurrencyInput ariaLabel="Tender Amount" value={amount} onChange={setAmount} />
            </TenderLabel>
            <div>
                <Button onClick={handleClick}>Tender</Button>
            </div>
        </Container>
    )
}

export const TenderInput = TenderInputComponent;
