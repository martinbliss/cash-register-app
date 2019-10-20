import { RenderResult, render } from "@testing-library/react";
import { InventoryBarComponent, InventoryMap } from "./inventoryBar.component";
import React from "react";
import InventoryConfig from '../config/inventory.json';

describe('InventoryBar', () => {

    it('should render successfully', async () => {
        const itemSelectionSpy = jest.fn();
        render(<InventoryBarComponent onItemSelected={itemSelectionSpy} />);
    });

    Object.keys(InventoryConfig).map(key => ({ key, item: (InventoryConfig as InventoryMap)[key] })).forEach(itemDefinition => {
        it(`should have an option for ${itemDefinition.key}`, async () => {
            const itemSelectionSpy = jest.fn();
            const { findByAltText } = render(<InventoryBarComponent onItemSelected={itemSelectionSpy} />);
            await findByAltText(itemDefinition.item.description);
        });
    });
});