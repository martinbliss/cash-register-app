import { render } from "@testing-library/react"
import { InventoryManagerContainer } from "./inventoryManager.container"
import React from "react";

it('should render', async () => {
    render(<InventoryManagerContainer />);
});