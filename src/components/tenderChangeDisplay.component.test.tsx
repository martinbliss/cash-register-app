import React from 'react';
import { render } from '@testing-library/react';
import { TenderChangeDisplay, TenderChangeAmount } from './tenderChangeDisplay.component';

it('should show a change amount', async () => {
    const sampleAmounts: TenderChangeAmount = {
        total: 83.22,
        denominations: {}
    };

    const { findByText } = render(<TenderChangeDisplay changeAmount={sampleAmounts} />);
    await findByText(`$${sampleAmounts.total}`);
});

it('should show denominations', async () => {
    const sampleAmounts: TenderChangeAmount = {
        total: 38.22,
        denominations: {
            hundreds: {
                caption: '$100',
                count: 1
            },
            twenties: {
                caption: '$20',
                count: 2
            },
            tens: {
                caption: '$10',
                count: 3
            },
            fives: {
                caption: '$5',
                count: 4
            },
        }
    }

    const { findByText } = render(<TenderChangeDisplay changeAmount={sampleAmounts} />);

    await findByText(`$${sampleAmounts.total.toString()}`);

    Object.keys(sampleAmounts.denominations).map(key => sampleAmounts.denominations[key]).map(async denomination => {
        await findByText(denomination.caption);
        await findByText(denomination.count.toString());
    })
});