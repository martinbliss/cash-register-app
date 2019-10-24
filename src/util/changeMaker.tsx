import denominationConfiguration from '../config/denominations.json';
import _ from 'lodash';
import Decimal from 'decimal.js';

Decimal.set({ precision: 5, rounding: 2 });

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
    const balance = new Decimal(tender).minus(total).toNumber();

    return {
        total,
        tender,
        balance,
        denominations: (balance > 0 && getDenominations(balance)) || {}
    };
}

// const getDenominations = (balance: number): Denominations => {
//     const rankedDenominations = _.orderBy(Object.keys(denominationConfiguration).map(key => ({ key, ...(denominationConfiguration as DenominationConfiguration)[key] })), ['value'], ['desc']);

//     let remainingBalance = new Decimal(balance);
//     const result = rankedDenominations.reduce((sum, n) => {
//         if (remainingBalance.gt(0)) {
//             const splitRemainder = remainingBalance.dividedBy(n.value).floor();

//             if (splitRemainder.gte(1)) {
//                 remainingBalance = remainingBalance.minus(new Decimal(n.value).times(splitRemainder));

//                 sum[n.key] = {
//                     caption: n.caption,
//                     count: splitRemainder.toNumber()
//                 };
//             }
//         }

//         return sum;
//     }, {} as Denominations);

//     return result;
// }

const getDenominations = (balance: number): Denominations => {
    let tens = (balance - balance % 10) / 10
    let tensChange = balance % 10
    let fives = (tensChange - tensChange % 5) / 5
    let fivesChange = tensChange % 5
    let ones = (fivesChange - fivesChange % 1) / 1
    let onesChange = fivesChange % 1
    let quarters = (onesChange - onesChange % .25) / .25
    let quartersChange = onesChange % .25
    let dimes = (quartersChange - quartersChange % .1) / .1
    let dimesChange = quartersChange % .1
    let nickels = (dimesChange - dimesChange % .05) / .05
    let nickelsChange = dimesChange % .05
    let pennies = (nickelsChange - nickelsChange % .01) / .01
    return {
        ['tens']: { caption: '$10', count: tens },
        ['fives']: { caption: '$5', count: fives },
        ['ones']: { caption: '$1', count: ones },
        ['quarters']: { caption: '25c', count: quarters },
        ['dimes']: { caption: '10c', count: dimes },
        ['nickels']: { caption: '5c', count: nickels },
        ['pennies']: { caption: '1c', count: pennies }
    }

}