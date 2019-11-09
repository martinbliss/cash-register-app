import React, { useRef, useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';
import Decimal from 'decimal.js';

const format = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });


const Input = styled.span`
    input {
        text-align: right;
    }
`;

interface Props {
    value: Decimal.Value;
    onChange?: (value: number) => void;
    disabled?: boolean;
    ariaLabel?: string;
}

export const CurrencyInput = ({ value = 0, onChange, ariaLabel = '', disabled = false, ...props }: Props) => {
    const ref = useRef<HTMLInputElement>(null);

    const displayType = disabled && 'text' || 'input';
    const handleFocus = () => setTimeout(() => ref.current && ref.current.setSelectionRange(0, ref.current.value.length), 100);
    const setRef = (input: HTMLInputElement) => {
        (ref.current as any) = input;
    }

    useEffect(() => {
        if (ref.current) {
            ref.current.setAttribute('aria-label', ariaLabel);
        }
    });

    if (!disabled && !ariaLabel) {
        throw 'aria-label prop is required but missing.';
    }

    return <Input><NumberFormat onFocus={handleFocus} prefix="$" thousandSeparator="," fixedDecimalScale={true} decimalScale={2} value={value.toString()} onValueChange={values => onChange && onChange(values.floatValue)} getInputRef={setRef} displayType={displayType} {...props} /></Input>
}
