import React from 'react';
import { render } from "@testing-library/react"
import { InventoryListItem } from "./inventoryListItem.component"
import { InventoryItem } from "../util/inventory.service";

it('should render', async () => {
    const item: InventoryItem = {
        price: 9.99,
        description: 'blah',
        image: ''
    };

    render(<InventoryListItem item={item} />);
});