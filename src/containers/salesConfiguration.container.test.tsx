import { render, fireEvent } from "@testing-library/react";
import { Sales, SalesConfiguration } from "../util/sales.service";
import { SalesConfigurationContainer, SalesConfigurationContainerComponent } from "./salesConfiguration.container";
import React from "react";

it('should have sales tax configuration field', async () => {
    const value: SalesConfiguration = { taxRate: .1, minimumTotal: 0 };
    const { findByText } = render(<SalesConfigurationContainerComponent value={value} onChange={jest.fn()} />);
    await findByText('Sales Tax:');
});

it('should have a minimum sales configuration', async () => {
    const value: SalesConfiguration = { taxRate: .1, minimumTotal: 0 };
    const { findByText } = render(<SalesConfigurationContainerComponent value={value} onChange={jest.fn()} />);
    await findByText('Minimum Total:');
});

it('should change the sales tax configuration when a change takes place', async () => {
    Sales.taxRate = .0825;
    const { findByText, baseElement } = render(<SalesConfigurationContainer />);
    const taxRateInput = baseElement.querySelector('input[value=".0825"]');

    if (taxRateInput) {
        fireEvent.change(taxRateInput, { target: { value: '.1' } });
        expect(Sales.taxRate).toEqual(.1);
    }
});

it('should change the minimum sales configuration when a change takes place', async () => {
    Sales.minimumTotal = 0;
    const { findByText, baseElement } = render(<SalesConfigurationContainer />);
    const minimumTotalInput = baseElement.querySelector('input[value="$0.00"]');

    if (minimumTotalInput) {
        fireEvent.change(minimumTotalInput, { target: { value: '$100.99' } });
        expect(Sales.minimumTotal).toEqual(100.99);
    }
});