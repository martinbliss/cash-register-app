import Tax from '../config/tax.json';
import SalesConfig from '../config/sales.json';

export interface SalesConfiguration {
    taxRate: number;
    minimumTotal: number;
}

export const Sales: SalesConfiguration = {
    taxRate: Tax.taxRate,
    minimumTotal: SalesConfig.minimumTotal
};