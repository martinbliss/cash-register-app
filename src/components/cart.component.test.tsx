import React from 'react';
import { render } from '@testing-library/react';
import { CartComponent } from './cart.component';
import { Item } from './inventoryBar.component';
import _ from 'lodash';

describe('Cart', () => {

    it('should render successfully', async () => {
        render(<CartComponent items={[]} />);
    });

    it('should show each item provided', async () => {
        const sampleItems: Item[] = [
            { price: 2.25, description: 'Test XYZ', image: '' },
            { price: 1.75, description: 'Keep That', image: '' },
            { price: 30.23, description: 'Fix This', image: '' },
        ];

        const { findByText } = render(<CartComponent items={sampleItems} />);

        await sampleItems.reduce((sum, item) => {
            return sum.then(async () => {
                await findByText(item.description);
                await findByText(`$${item.price.toString()}`);
            });
        }, Promise.resolve());

    });

    it('should show correct tax', async () => {
        const sampleItems: Item[] = [
            { price: 2.25, description: 'Test XYZ', image: '' },
            { price: 1.75, description: 'Keep That', image: '' },
            { price: 30.23, description: 'Fix This', image: '' },
        ];

        const taxRate = 0.0825;
        const { findByText } = render(<CartComponent items={sampleItems} taxRate={taxRate} />);

        const sampleTotal = _.sum(sampleItems.map(i => i.price));
        const expectedTaxAmount = sampleTotal * taxRate;
        const expectedTaxAmountString = (new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' })).format(expectedTaxAmount);

        await findByText('Tax (8.25%)');
        await findByText(`${expectedTaxAmountString}`);
    });

    it('should show correct sub-total', async () => {
        const sampleItems: Item[] = [
            { price: 2.25, description: 'Test XYZ', image: '' },
            { price: 1.75, description: 'Keep That', image: '' },
            { price: 30.23, description: 'Fix This', image: '' },
        ];

        const taxRate = 0.0825;
        const { findByText } = render(<CartComponent items={sampleItems} taxRate={taxRate} />);

        const subTotal = _.sum(sampleItems.map(i => i.price));
        const expectedSubTotalString = (new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' })).format(subTotal);

        await findByText('Sub-Total');
        await findByText(`${expectedSubTotalString}`);
    });
    it('should show correct total', async () => {
        const sampleItems: Item[] = [
            { price: 2.25, description: 'Test XYZ', image: '' },
            { price: 1.75, description: 'Keep That', image: '' },
            { price: 30.23, description: 'Fix This', image: '' },
        ];

        const taxRate = 0.0825;
        const { findByText } = render(<CartComponent items={sampleItems} taxRate={taxRate} />);

        const subTotal = _.sum(sampleItems.map(i => i.price));
        const sampleTotal = subTotal * (1 + taxRate);
        const expectedTotalString = (new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' })).format(sampleTotal);

        await findByText('Total');
        await findByText(`${expectedTotalString}`);
    });
});