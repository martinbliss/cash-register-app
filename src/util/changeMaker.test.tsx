import { Denominations, makeChange } from "./changeMaker";

interface TestCase {
    total: number;
    tender: number;
    balance: number;
    denominations: {
        [key: string]: number;
    }
}

const testCases: TestCase[] = [
    {
        total: 103.22,
        tender: 120,
        balance: 16.78,
        denominations: {
            tens: 1,
            fives: 1,
            ones: 1,
            quarters: 3,
            pennies: 3
        }
    },
    {
        total: 189.29,
        tender: 120,
        balance: -69.29,
        denominations: {}
    },
    {
        total: 150.00,
        tender: 160,
        balance: 10,
        denominations: {
            tens: 1
        }
    },
    {
        total: 25,
        tender: 30,
        balance: 5,
        denominations: {
            fives: 1
        }
    },
    {
        total: 59,
        tender: 70,
        balance: 11,
        denominations: {
            tens: 1,
            ones: 1
        }
    },
    {
        total: 15,
        tender: 20.2,
        balance: 5.2,
        denominations: {
            fives: 1,
            dimes: 2
        }
    }
];

testCases.forEach(testCase => {
    it(`should handle making change for $${testCase.total}`, async () => {
        const result = makeChange(testCase.total, testCase.tender);

        expect(result.total).toEqual(testCase.total);
        expect(result.tender).toEqual(testCase.tender);
        expect(result.balance).toEqual(testCase.balance);

        Object.keys(testCase.denominations).map(key => ({ key, count: testCase.denominations[key] })).forEach(denomination => {
            const actualCount = result.denominations[denomination.key] && result.denominations[denomination.key].count;
            expect(actualCount).toEqual(denomination.count);
        });
    });
});