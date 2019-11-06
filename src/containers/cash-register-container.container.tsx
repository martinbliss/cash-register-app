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


interface Props extends RouteComponentProps<any> {

}

export const CashRegisterContainerComponent = ({ }: Props) => {
    const history = useHistory();

    const [items, setItems] = useState<InventoryItem[]>([]);
    const [tender, setTender] = useState(0);
    const [changeAmount, setChangeAmount] = useState({} as TenderChangeAmount);

    const subTotal = useMemo(() => _.sum(items.map(i => i.price)), [items]);
    const total = new Decimal(subTotal).mul(1 + TaxConfig.taxRate).toNumber();

    const handleItemSelection = (item: InventoryItem) => setItems([...items, item]);
    const handleTenderAmount = (tender: number) => {
        setTender(tender);
        setChangeAmount(makeChange(total, tender));
        history.goBack();
    };

    const handleTenderClick = () => {
        console.info('tender click');
        history.push('/tender');
    }
    const handleTenderCancel = () => {
        console.info('click cancel');
        history.goBack();
    };


    return <Container>
        <Row>
            <span>Total:</span>
            <CurrencyInput value={total} disabled />
        </Row>
        <Row>
            <InventoryBar onItemSelected={handleItemSelection} />
        </Row>
        <Row>
            <Button disabled={!total} onClick={handleTenderClick}>
                Tender
            </Button>
        </Row>
        <Row>
            <Cart items={items} taxRate={TaxConfig.taxRate} />
        </Row>
        <Route path="/tender" component={() => <TenderModal total={total} onConfirm={handleTenderAmount} onCancel={handleTenderCancel} />} />
    </Container>;
}

export const CashRegisterContainer = CashRegisterContainerComponent;