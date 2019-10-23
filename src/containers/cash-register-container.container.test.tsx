import React from 'react';
import { CashRegisterContainer } from './cash-register-container.container';
import { render, findByAltText } from '@testing-library/react';

it('renderrs without crashing', () => {
    const div = document.createElement('div');
    render(<CashRegisterContainer />);
});

it('should show the sub-total', async () => {
    const { findByText } = render(<CashRegisterContainer />);
    findByText('Sub-Total');
});
