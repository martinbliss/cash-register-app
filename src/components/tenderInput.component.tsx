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
    font-size: 32px;    
    margin-top: 32px;
    padding: 8px 18px;
`;

export const TenderInputComponent = ({ onTender }: Props) => {
    const [amount, setAmount] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onTender(amount);
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <TenderLabel>
                    Tender Amount:
                <CurrencyInput ariaLabel="Tender Amount" value={amount} onChange={setAmount} />
                </TenderLabel>
                <div>
                    <Button type="submit">Tender</Button>
                </div>
            </form>

        </Container>
    )
}

export const TenderInput = TenderInputComponent;
