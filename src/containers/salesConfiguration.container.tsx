import React from 'react';
import { SalesConfiguration, Sales } from '../util/sales.service';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Decimal from 'decimal.js';
import { CurrencyInput } from '../components';

interface Props {
    value: SalesConfiguration,
    onChange: (config: SalesConfiguration) => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;    
    margin: 8px 0;

    input {
        font-size: 32px;
        margin: 0 12px;
        flex-grow: 1;
    }
`;

const Label = styled.label`
    font-size: 32px;
    color: white;
`;

export const SalesConfigurationContainerComponent = ({ value, onChange }: Props) => {
    const { taxRate, minimumTotal } = value;

    const handleChange = (field: keyof SalesConfiguration, innerValue: any) => onChange({ ...value, [field]: innerValue });

    return <Container>
        <Row>
            <Label>Sales Tax:</Label>
            <NumberFormat value={taxRate} onValueChange={value => handleChange('taxRate', new Decimal(value.value).toNumber())} />
        </Row>
        <Row>
            <Label>Minimum Total:</Label>
            <CurrencyInput value={minimumTotal} onChange={value => handleChange('minimumTotal', value)} ariaLabel="minTotal" />
        </Row>
    </Container>;
}


export const SalesConfigurationContainer = () => <SalesConfigurationContainerComponent
    value={Sales}
    onChange={config => {
        Sales.minimumTotal = config.minimumTotal;
        Sales.taxRate = config.taxRate;
    }}
/>;
