import { render, RenderResult } from "@testing-library/react";
import { CurrencyInput } from "./currencyInput.component";
import React from "react";

describe('CurrencyInput', () => {

    it('should render successfully', async () => {
        render(<CurrencyInput value={23.99} ariaLabel="test" onChange={jest.fn()} />);
    });

});