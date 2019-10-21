import React, { useState } from 'react';
import { KeyPad, CurrencyInput, TenderInput } from '../components';
import styled from 'styled-components';
import { InventoryBar, Item } from '../components/inventoryBar.component';
import _ from 'lodash';
import { Cart } from '../components/cart.component';
import TaxConfig from '../config/tax.json';
import { TenderChangeAmount, TenderChangeDisplay } from '../components/tenderChangeDisplay.component';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;    
    min-height: 2800px;
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

    const handleItemSelection = (item: Item) => setItems([...items, item]);
    const handleTender = (amount: number) => { console.info('tender recd', amount); };

    const total = _.sum(items.map(i => i.price));

    const tenderChangeSample: TenderChangeAmount = {
        total: 200.00,
        denominations: {
            hundreds: {
                caption: '$100',
                count: 2
            },
            tens: {
                caption: '$10',
                count: 1
            },
            fives: {
                caption: '$5',
                count: 1
            },
            ones: {
                caption: '$1',
                count: 1
            }
        }
    };

    return <Container>
        <MainPanel>
            <TotalContainer>
                <span>Total: </span>
                <CurrencyInput ariaLabel="total" value={total} disabled />
            </TotalContainer>
            <div>
                <InventoryBar onItemSelected={handleItemSelection} />
            </div>
            <TenderContainer>
                <div>
                    <TenderInput onTender={handleTender} />
                </div>
                <TenderContainer>
                    <TenderChangeDisplay changeAmount={tenderChangeSample} />
                </TenderContainer>
            </TenderContainer>

        </MainPanel>
        <Panel>
            <Cart items={items} taxRate={TaxConfig.taxRate} />
        </Panel>

    </Container>;
}

export const CashRegisterContainer = CashRegisterContainerComponent;