import denominationConfiguration from '../config/denominations.json';
import _ from 'lodash';
import Decimal from 'decimal.js';

Decimal.set({ precision: 5, rounding: 2 });

export interface DenominationConfiguration {
    [key: string]: {
        caption: string;
        value: number;
    }
}

export interface Denominations {
    [key: string]: {
        caption: string;
        count: number;
    }
}

export interface TransactionResult {
    total: number;
    tender: number;
    balance: number;
    denominations: Denominations
}

export const makeChange = (total: number, tender: number): TransactionResult => {
    const balance = new Decimal(new Decimal(tender).minus(total).toPrecision(2)).toNumber();

    return {
        total,
        tender,
        balance,
        denominations: (balance > 0 && getDenominations(balance)) || {}
    };
}

const getDenominations = (balance: number): Denominations => {
    return {};
};
