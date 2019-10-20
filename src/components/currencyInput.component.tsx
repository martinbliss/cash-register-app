import React, { useRef, useState } from 'react';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';

const format = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });


const Input = styled.span`
    input {
        text-align: right;
    }
`;

interface Props {
    value: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
}

export const CurrencyInput = ({ value = 0, onChange, disabled = false, ...props }: Props) => {
    const ref = useRef<HTMLInputElement>(null);

    const displayType = disabled && 'text' || 'input';
    const handleFocus = () => setTimeout(() => ref.current && ref.current.setSelectionRange(0, ref.current.value.length), 100);
    return <Input><NumberFormat onFocus={handleFocus} prefix="$" thousandSeparator="," fixedDecimalScale={true} decimalScale={2} value={value} onValueChange={values => onChange && onChange(values.floatValue)} getInputRef={ref} displayType={displayType} {...props} /></Input>
}
