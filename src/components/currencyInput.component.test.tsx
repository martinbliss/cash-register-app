import { render, RenderResult } from "@testing-library/react";
import { CurrencyInput } from "./currencyInput.component";
import React from "react";

describe('CurrencyInput', () => {

    it('should render successfully', async () => {
        render(<CurrencyInput value={23.99} ariaLabel="test" onChange={jest.fn()} />);
    });

    it('should have an input when enabled', async () => {
        const { baseElement } = render(<CurrencyInput ariaLabel="test" value={23.99} onChange={jest.fn()} />);
        expect(baseElement.querySelector('input')).toBeTruthy();
    });

    it('should have have a currency format', async () => {
        const { baseElement, debug } = render(<CurrencyInput value={23.99} ariaLabel="test" onChange={jest.fn()} />);
        const input = baseElement.querySelector('input');

        if (input) {
            expect(input.getAttribute('value')).toEqual('$23.99');
        } else {
            throw 'Input not found!';
        }
    });

    it('should NOT have an input when disabled', async () => {
        const { baseElement } = render(<CurrencyInput value={23.99} onChange={jest.fn()} disabled={true} />);
        expect(baseElement.querySelector('input')).toBeFalsy();
    });
    it('should display a currency value when disabled', async () => {
        const { findByText } = render(<CurrencyInput value={23.99} onChange={jest.fn()} disabled={true} />);
        findByText('$23.99');
    });
    it('should not throw if aria label is missing when component is disabled', async () => {
        render(<CurrencyInput value={23.22} disabled />);
    });
});