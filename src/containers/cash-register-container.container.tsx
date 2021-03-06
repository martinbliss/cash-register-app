import React, { useState, useMemo } from 'react';
import { KeyPad, CurrencyInput, TenderInput } from '../components';
import styled from 'styled-components';
import { InventoryBar } from '../components/inventoryBar.component';
import _ from 'lodash';
import { Cart } from '../components/cart.component';
import TaxConfig from '../config/tax.json';
import { TenderChangeAmount, TenderChangeDisplay } from '../components/tenderChangeDisplay.component';
import { makeChange } from '../util/changeMaker';
import Decimal from 'decimal.js';
import { InventoryItem } from '../util';
import { TenderModal } from '../components/tenderModal.component';
import { Route, RouteComponentProps, Link, useLocation, useHistory } from 'react-router-dom';
import { Sales } from '../util/sales.service';

Decimal.set({ precision: 5, rounding: 2 });

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    margin: 32px auto;

    span {
        font-size: 32px;
    }
`;

const Button = styled.button`
    font-size: 32px;
    padding: 16px 48px;
    cursor: pointer;
`;

const Label = styled.label`
    font-size: 32px;
    color: white;

    span {
        color: white;
    }
`;

const SemiContainer = styled.div`
    display: flex;
    flex-grow: 1

    > * {
        margin: 0 16px;
    }
`;


interface Props {

}

export const CashRegisterContainerComponent = ({ }: Props) => {
    const history = useHistory();

    const [items, setItems] = useState<InventoryItem[]>([]);
    const [tender, setTender] = useState(0);
    const [changeAmount, setChangeAmount] = useState({} as TenderChangeAmount);

    const taxRatePercentage = new Decimal(Sales.taxRate).mul(100).toFixed(2);
    const subTotal = useMemo(() => _.sum(items.map(i => i.price)).toString(), [items]);
    const tax = new Decimal(subTotal).mul(Sales.taxRate);//.toFixed(2);
    const total = new Decimal(subTotal).plus(tax).toString();

    const handleItemSelection = (item: InventoryItem) => setItems([...items, item]);
    const handleTenderAmount = (tender: number) => {
        setTender(tender);
        setChangeAmount(makeChange(new Decimal(total).toNumber(), tender));
        history.goBack();
    };

    const handleTenderClick = () => {
        history.push('/tender');
    }
    const handleTenderCancel = () => {
        history.push('/');
    };


    return <Container>
        <Row>
            <Label>
                Total:
            <CurrencyInput value={total} disabled />
            </Label>
        </Row>
        <Row>
            <InventoryBar onItemSelected={handleItemSelection} />
        </Row>
        <Row>
            <Button disabled={!total || new Decimal(total).lessThan(Sales.minimumTotal)} onClick={handleTenderClick}>
                Tender
            </Button>
        </Row>
        <SemiContainer>
            <Cart items={items} taxRate={taxRatePercentage} tax={tax} subTotal={subTotal} total={total} />
            {changeAmount.balance && <TenderChangeDisplay changeAmount={changeAmount} />}
        </SemiContainer>
        <Route path="/tender" component={() => <TenderModal total={total} onConfirm={handleTenderAmount} onCancel={handleTenderCancel} />} />
    </Container>;
}

export const CashRegisterContainer = CashRegisterContainerComponent;