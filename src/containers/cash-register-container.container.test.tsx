import React from 'react';
import { CashRegisterContainer } from './cash-register-container.container';
import { render, findByAltText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

it('renderrs without crashing', () => {
    const div = document.createElement('div');
    // render(<CashRegisterContainer />);
    render(
        <MemoryRouter>
            <CashRegisterContainer />
        </MemoryRouter>
    )
});

it('should show the sub-total', async () => {
    const { findByText } = render(
        <MemoryRouter>
            <CashRegisterContainer />)
    </MemoryRouter>);

    findByText('Sub-Total');
});
