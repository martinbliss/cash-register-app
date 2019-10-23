import React from 'react';
import { render, findByTestId } from '@testing-library/react';
import { TenderChangeDisplay, TenderChangeAmount } from './tenderChangeDisplay.component';

it('should show a change amount', async () => {
    const sampleAmounts: TenderChangeAmount = {
        balance: 83.22,
        denominations: {}
    };

    const { findByText } = render(<TenderChangeDisplay changeAmount={sampleAmounts} />);
    await findByText(`$${sampleAmounts.balance}`);
});

it('should show denominations', async () => {
    const sampleAmounts: TenderChangeAmount = {
        balance: 38.22,
        denominations: {
            twenties: {
                caption: '$20',
                count: 1
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
                count: 3
            },
            dimes: {
                caption: '10c',
                count: 2
            },
            pennies: {
                caption: '1c',
                count: 2
            }
        }
    }

    const { findByText, findByTestId } = render(<TenderChangeDisplay changeAmount={sampleAmounts} />);

    await findByText(`$${sampleAmounts.balance.toString()}`);

    const samples = Object.keys(sampleAmounts.denominations).map(key => ({ key, ...sampleAmounts.denominations[key] }));

    await samples.reduce((sum, denomination) => {
        return sum.then(async () => {
            await findByText(denomination.caption);
            const value = await findByTestId(denomination.key);
            expect(value.textContent).toEqual(denomination.count.toString());
        })
    }, Promise.resolve());

});

it('should gracefully handle empty tender change objects', async () => {
    render(<TenderChangeDisplay />);
});