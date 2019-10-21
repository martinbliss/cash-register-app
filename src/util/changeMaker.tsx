import denominationConfiguration from '../config/denominations.json';
import _ from 'lodash';
7
interface DenominationConfiguration {
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
    const balance = tender - total;

    return {
        total,
        tender,
        balance,
        denominations: balance > 0 && getDenominations(balance) || {}
    };
}

const getDenominations = (balance: number): Denominations => {
    const rankedDenominations = _.orderBy(Object.keys(denominationConfiguration).map(key => ({ key, ...(denominationConfiguration as DenominationConfiguration)[key] })), ['value'], ['desc']);

    let remainingBalance = balance;
    const result = rankedDenominations.reduce((sum, n) => {
        if (remainingBalance > 0) {
            const splitRemainder = Math.floor((remainingBalance / n.value));

            if (splitRemainder >= 1) {
                remainingBalance -= (n.value * splitRemainder);

                sum[n.key] = {
                    caption: n.caption,
                    count: splitRemainder
                };
            }
        }

        return sum;
    }, {} as Denominations);

    return result;
}