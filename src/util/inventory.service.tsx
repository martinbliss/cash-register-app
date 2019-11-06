import InventoryConfig from '../config/inventory.json';

export interface InventoryItem {
    description: string;
    price: number;
    image: string;
}

export interface InventoryConfiguration {
    [key: string]: InventoryItem;
}

export const Inventory = { ...InventoryConfig } as InventoryConfiguration;