import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TenderInput } from './tenderInput.component';

it('should render successfully', async () => {
    render(<TenderInput onTender={jest.fn()} />);
});

it('should have an input', async () => {
    const { baseElement } = render(<TenderInput onTender={jest.fn()} />);
    expect(baseElement.querySelector('input')).toBeTruthy();
});

it('should have a button to tender amount', async () => {
    const { baseElement } = render(<TenderInput onTender={jest.fn()} />);
    const button = baseElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button && button.textContent).toEqual('Tender');
});

it('should say Tender Label', async () => {
    const { findByText } = render(<TenderInput onTender={jest.fn()} />);
    await findByText('Tender Amount:');
});

it('should send tender amount when clicked', async () => {
    const spy = jest.fn();
    const { baseElement, findByText } = render(<TenderInput onTender={spy} />);
    const input = baseElement.querySelector('input');

    if (input) {
        fireEvent.change(input, { target: { value: '$34.89' } });
    } else {
        throw 'input not found.';
    }

    (await findByText('Tender')).click();
    expect(spy).toHaveBeenCalledWith(34.89);
});

