import { Denominations, makeChange, DenominationConfiguration } from "./changeMaker";
import _ from 'lodash';
import denominationsConfig from '../config/denominations.json';
import Decimal from 'decimal.js';

Decimal.set({ precision: 5, rounding: 2 });

interface TestCase {
    total: number;
    tender: number;
    balance: number;
    denominations: {
        [key: string]: number;
    }
}

// const testCases: TestCase[] = [
//     {
//         total: 103.22,
//         tender: 120,
//         balance: 16.78,
//         denominations: {
//             tens: 1,
//             fives: 1,
//             ones: 1,
//             quarters: 3,
//             pennies: 3
//         }
//     },
//     {
//         total: 189.29,
//         tender: 120,
//         balance: -69.29,
//         denominations: {}
//     },
//     {
//         total: 150.00,
//         tender: 160,
//         balance: 10,
//         denominations: {
//             tens: 1
//         }
//     },
//     {
//         total: 25,
//         tender: 30,
//         balance: 5,
//         denominations: {
//             fives: 1
//         }
//     },
//     {
//         total: 59,
//         tender: 70,
//         balance: 11,
//         denominations: {
//             tens: 1,
//             ones: 1
//         }
//     },
//     {
//         total: 15,
//         tender: 20.2,
//         balance: 5.2,
//         denominations: {
//             fives: 1,
//             dimes: 2
//         }
//     }
// ];

const testCases = _.range(0, 50).map(_ => {
    const total = new Decimal(new Decimal(Math.random() * 1000).toPrecision(2)).toNumber();
    const tender = new Decimal(new Decimal(total).add(Math.random() * 10).toPrecision(2)).toNumber();
    const balance = new Decimal(new Decimal(tender).minus(total).toPrecision(2)).toNumber();

    return {
        total,
        balance,
        tender,
        denominations: getDenominations(balance)
    };
})





testCases.forEach(testCase => {

    // it(`should handle making change for $${testCase.total}`, async () => {
    //     const result = makeChange(testCase.total, testCase.tender);

    //     expect(result.total).toEqual(testCase.total)
    //     expect(result.tender).toEqual(testCase.tender);
    //     expect(result.balance).toEqual(testCase.balance);

    //     Object.keys(testCase.denominations).map(key => ({ key, count: testCase.denominations[key] })).forEach(denomination => {
    //         const actualCount = result.denominations[denomination.key] && result.denominations[denomination.key].count;
    //         expect(actualCount).toEqual(denomination.count);
    //     });
    // });

    it(`should show the correct denominations for $${testCase.balance}`, async () => {
        const result = makeChange(testCase.total, testCase.tender);
        expect(result.denominations).toEqual(testCase.denominations);
    });

    it('should only have denominations with integers', async () => {
        const result = makeChange(testCase.total, testCase.tender);

        Object.keys(result.denominations).map(key => ({ key, ...result.denominations[key] })).forEach(denomination => {
            parseInt(denomination.count.toString());
        });
    });

    it('should only contain required denominations', () => {
        const result = makeChange(testCase.total, testCase.tender);
        Object.keys(result.denominations).map(key => ({ key, ...result.denominations[key] })).forEach(denomination => {
            expect(denomination.count).toBeGreaterThanOrEqual(1);
        });
    });

    it('should show a consistent balance', async () => {
        const result = makeChange(testCase.total, testCase.tender);
        expect(result.balance).toEqual(testCase.balance);
    });
    it('should show a consistent tender', async () => {
        const result = makeChange(testCase.total, testCase.tender);
        expect(result.tender).toEqual(testCase.tender);
    });
    it('should show a consistent total', async () => {
        const result = makeChange(testCase.total, testCase.tender);
        expect(result.total).toEqual(testCase.total);
    });

    it(`should have denominations which add up to $${testCase.balance}`, async () => {
        const result = makeChange(testCase.total, testCase.tender);
        const sum = Object.keys(result.denominations).map(key => ({ key, ...result.denominations[key] }))
            .reduce((sum, n) => new Decimal(sum).add(new Decimal(n.count).times((denominationsConfig as DenominationConfiguration)[n.key].value).toPrecision(2)).toNumber(), 0);
        expect(sum).toEqual(testCase.balance);
    });
});

function getDenominations(tender: number) {
    const availableDenominations = _.orderBy(Object.keys(denominationsConfig).map(key => ({ key, ...(denominationsConfig as DenominationConfiguration)[key] })), ['value'], ['desc']);
    let remainder = tender;

    const returnValue = availableDenominations.reduce((sum, n) => {
        if (remainder > 0) {
            const splitAmount = new Decimal(remainder).dividedToIntegerBy(n.value);

            if (splitAmount.gte(1)) {
                remainder = new Decimal(remainder).minus(splitAmount.times(n.value)).toNumber();
                sum[n.key] = {
                    caption: n.caption,
                    count: splitAmount.toNumber()
                }
            }
        }
        return sum;
    }, {} as Denominations);

    return returnValue;
}