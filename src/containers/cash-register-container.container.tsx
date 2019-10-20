import React, { useState } from 'react';
import { KeyPad, CurrencyInput } from '../components';
import styled from 'styled-components';
import { InventoryBar, Item } from '../components/inventoryBar.component';
import _ from 'lodash';
import { Cart } from '../components/cart.component';
import TaxConfig from '../config/tax.json';

// const KeyPadContainer = styled.div`

// `;

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


const Panel = styled.div`
    display: inline-block;
    min-width: 1000px;
    margin-left: 64px;
`;

export const CashRegisterContainerComponent = () => {
    const [items, setItems] = useState<Item[]>([]);

    // const [total, setTotal] = useState(0);
    // const handleKeyPadClick = (number: number) => { console.info('number clicked', number) };
    const handleItemSelection = (item: Item) => setItems([...items, item]);

    const total = _.sum(items.map(i => i.price));

    return <Container>
        <MainPanel>
            <TotalContainer>
                <span>Total: </span>
                <CurrencyInput value={total} disabled />
            </TotalContainer>
            <div>
                <InventoryBar onItemSelected={handleItemSelection} />
            </div>
            {/* <KeyPadContainer>
            <KeyPad onPress={handleKeyPadClick} />
        </KeyPadContainer> */}
        </MainPanel>
        <Panel>
            <Cart items={items} taxRate={TaxConfig.taxRate} />
        </Panel>

    </Container>;
}

export const CashRegisterContainer = CashRegisterContainerComponent;