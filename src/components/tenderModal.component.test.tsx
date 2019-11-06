import React from 'react';
import { render, findByTestId, fireEvent } from '@testing-library/react';
import { TenderModal } from './tenderModal.component';

it('should render', async () => {
    render(<TenderModal total={9} onCancel={jest.fn()} onConfirm={jest.fn()} />);
});

it('should contain a tender inpput', async () => {
    const { baseElement } = render(<TenderModal total={9} onCancel={jest.fn()} onConfirm={jest.fn()} />);
    const input = baseElement.querySelector('input');
    expect(input).toBeTruthy();
    expect(input && input.getAttribute('value') === '$9.00');
});

it('should have a confirmation button', async () => {
    const { findByText } = render(<TenderModal total={9} onCancel={jest.fn()} onConfirm={jest.fn()} />);
    await findByText('Confirm');
});

it('should have a cancel button', async () => {
    const { findByText } = render(<TenderModal total={9} onCancel={jest.fn()} onConfirm={jest.fn()} />);
    await findByText('Cancel');
});

it('should use onConfirm callback when confirm button is clicked', async () => {
    const confirmSpy = jest.fn();
    const { baseElement, findByText, debug } = render(<TenderModal total={9} onCancel={jest.fn()} onConfirm={confirmSpy} />);
    const input = baseElement.querySelector('input');
    const confirmButton = await findByText('Confirm');

    if (input) {
        fireEvent.change(input, { target: { value: '$13.99' } });
        fireEvent.click(confirmButton);
        expect(confirmSpy).toHaveBeenCalledWith(13.99);
    } else {
        throw 'Input not found';
    }
});

it('should use onCancel callback when confirm button is clicked', async () => {
    const cancelSpy = jest.fn();
    const { findByText } = render(<TenderModal total={9} onCancel={cancelSpy} onConfirm={jest.fn()} />);
    const cancelButton = await findByText('Cancel');
    fireEvent.click(cancelButton);
    expect(cancelSpy).toHaveBeenCalled();
});

it('should not allow insufficient tender', async () => {
    const confirmSpy = jest.fn();
    const { baseElement, findByText } = render(<TenderModal total={9} onCancel={jest.fn()} onConfirm={confirmSpy} />);
    const input = baseElement.querySelector('input');
    const confirmButton = await findByText('Confirm');

    (input && input.setAttribute('value', '$3'));

    fireEvent.click(confirmButton);

    expect(confirmSpy).not.toHaveBeenCalled();
});

it('should display given total', async () => {
    const { findByText } = render(<TenderModal total={9.22} onCancel={jest.fn()} onConfirm={jest.fn()} />);
    await findByText('Total: $9.22');
});