import React from 'react';
import ReactDOM from 'react-dom';
import { CashRegisterContainerComponent } from './cash-register-container.container';

it('renderrs without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CashRegisterContainerComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
});