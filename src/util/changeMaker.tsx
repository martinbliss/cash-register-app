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
    const balance = new Decimal(new Decimal(tender).minus(total)).toNumber();

    return {
        total,
        tender,
        balance,
        denominations: (balance > 0 && getDenominations(balance)) || {}
    };
}


const getDenominations = (balance: number): Denominations => {
    const rankedDenominations = _.orderBy(Object.keys(denominationConfiguration).map(key => ({ key, ...(denominationConfiguration as DenominationConfiguration)[key] })), ['value'], ['desc']);

    let remainingBalance = new Decimal(balance);
    const result = rankedDenominations.reduce((sum, n) => {
        if (remainingBalance.gt(0)) {
            const splitRemainder = remainingBalance.dividedToIntegerBy(n.value);

            if (splitRemainder.gte(1)) {
                remainingBalance = remainingBalance.minus(new Decimal(n.value).times(splitRemainder));

                sum[n.key] = {
                    caption: n.caption,
                    count: splitRemainder.toNumber()
                };
            }
        }

        return sum;
    }, {} as Denominations);

    return result;
}

