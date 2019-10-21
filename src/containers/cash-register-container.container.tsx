import React, { useState, useMemo } from 'react';
import { KeyPad, CurrencyInput, TenderInput } from '../components';
import styled from 'styled-components';
import { InventoryBar, Item } from '../components/inventoryBar.component';
import _ from 'lodash';
import { Cart } from '../components/cart.component';
import TaxConfig from '../config/tax.json';
import { TenderChangeAmount, TenderChangeDisplay } from '../components/tenderChangeDisplay.component';
import { makeChange } from '../util/changeMaker';
import Decimal from 'decimal.js';

Decimal.set({ precision: 5, rounding: 2 });

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;    
    // min-height: 2800px;
`;

const MainPanel = styled.div`
    flex-grow: 1;
    display: inline-block;
`;

const TotalContainer = styled.div`
    margin: 24px 0;
    font-size: 64px;    
    input {
        font-size: 64px;
    }
`;

const TenderContainer = styled.div`
    margin-top: 124px;
`;

const Panel = styled.div`
    display: inline-block;
    min-width: 1000px;
    margin-left: 64px;
`;

export const CashRegisterContainerComponent = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [tender, setTender] = useState(0);
    const [changeAmount, setChangeAmount] = useState({} as TenderChangeAmount);

    const subTotal = useMemo(() => _.sum(items.map(i => i.price)), [items]);
    const total = new Decimal(subTotal).mul(1 + TaxConfig.taxRate).toNumber();

    const handleItemSelection = (item: Item) => setItems([...items, item]);
    const handleTender = (tender: number) => {
        setTender(tender);
        setChangeAmount(makeChange(total, tender))
    };

    return <Container>
        <MainPanel>
            <TotalContainer>
                <span>Sub-Total: </span>
                <CurrencyInput ariaLabel="total" value={subTotal} disabled />
            </TotalContainer>
            <div>
                <InventoryBar onItemSelected={handleItemSelection} />
            </div>
            <TenderContainer>
                <div>
                    <TenderInput onTender={handleTender} />
                </div>
                <TenderContainer>
                    <TenderChangeDisplay changeAmount={changeAmount} />
                </TenderContainer>
            </TenderContainer>

        </MainPanel>
        <Panel>
            <Cart items={items} taxRate={TaxConfig.taxRate} />
        </Panel>

    </Container>;
}

export const CashRegisterContainer = CashRegisterContainerComponent;