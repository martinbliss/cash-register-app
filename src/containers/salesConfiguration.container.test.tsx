import { render } from "@testing-library/react";
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
    // const value: SalesConfiguration = { taxRate: .1, minimumTotal: 0 };
    // const spy = jest.fn();
    // const { findByText } = render(<SalesConfigurationContainerComponent value={value} onChange={spy} />);
    // await findByText('Sales Tax:');
    expect(false).toBeTruthy();

});

it('should change the minimum sales configuration when a change takes place', async () => {
    expect(false).toBeTruthy();

});