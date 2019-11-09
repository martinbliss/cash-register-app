import React from 'react';
import { render } from '@testing-library/react';
import { CartComponent } from './cart.component';
import { Item } from './inventoryBar.component';
import _ from 'lodash';

describe('Cart', () => {

    it('should render successfully', async () => {
        render(<CartComponent items={[]} taxRate={0} tax={0} subTotal={0} total={0} />);
    });

    it('should show each item provided', async () => {
        const sampleItems: Item[] = [
            { price: 2.25, description: 'Test XYZ', image: '' },
            { price: 1.75, description: 'Keep That', image: '' },
            { price: 30.23, description: 'Fix This', image: '' },
        ];

        const { findByText } = render(<CartComponent items={sampleItems} taxRate={0} tax={0} subTotal={0} total={0} />);

        await sampleItems.reduce((sum, item) => {
            return sum.then(async () => {
                await findByText(item.description);
                await findByText(`$${item.price.toString()}`);
            });
        }, Promise.resolve());

    });

    it('should show tax', async () => {
        const sampleItems: Item[] = [
            { price: 2.25, description: 'Test XYZ', image: '' },
            { price: 1.75, description: 'Keep That', image: '' },
            { price: 30.23, description: 'Fix This', image: '' },
        ];

        const taxAmount = '20.33';
        const { findByText } = render(<CartComponent items={sampleItems} taxRate={'8.25'} tax={taxAmount} subTotal={0} total={0} />);


        await findByText('Tax (8.25%)');
        await findByText(`$${taxAmount}`);
    });

    it('should show sub-total', async () => {
        const sampleItems: Item[] = [
            { price: 2.25, description: 'Test XYZ', image: '' },
            { price: 1.75, description: 'Keep That', image: '' },
            { price: 30.23, description: 'Fix This', image: '' },
        ];

        const subTotal = '20.33';
        const { findByText } = render(<CartComponent items={sampleItems} taxRate={0} tax={0} subTotal={subTotal} total={0} />);

        await findByText('Sub-Total');
        await findByText(`$${subTotal}`);
    });
    it('should show total', async () => {
        const sampleItems: Item[] = [
            { price: 2.25, description: 'Test XYZ', image: '' },
            { price: 1.75, description: 'Keep That', image: '' },
            { price: 30.23, description: 'Fix This', image: '' },
        ];

        const total = '99.33';
        const { findByText } = render(<CartComponent items={sampleItems} taxRate={0} tax={0} subTotal={0} total={total} />);

        await findByText('Total');
        await findByText(`$${total}`);
    });
});