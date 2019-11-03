import { Denominations, makeChange, DenominationConfiguration, TransactionResult } from "./changeMaker";
import _ from 'lodash';
import denominationsConfig from '../config/denominations.json';
import Decimal from 'decimal.js';

Decimal.set({ precision: 5, rounding: 2 });

interface TestCase {
    total: number;
    tender: number;
    balance: number;
}

const testCases = _.range(0, 50).map(_ => {
    const total = new Decimal(new Decimal(Math.random() * 1000).toPrecision(2)).toNumber();
    const tender = new Decimal(new Decimal(total).add(Math.random() * 10).toPrecision(2)).toNumber();
    const balance = new Decimal(new Decimal(tender).minus(total).toPrecision(2)).toNumber();

    return {
        total,
        balance,
        tender,
        // denominations: getDenominations(balance)
    };
})





testCases.forEach(testCase => {



    describe(`when making change for $${testCase.balance}`, () => {

        let result = makeChange(testCase.total, testCase.tender);

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

        describe(`the denominations`, () => {

            const denominationValueRanking = _.orderBy(Object.keys(result.denominations).map(key => ({ key, ...result.denominations[key] })).map(denomination => ({
                ...denomination,
                config: (denominationsConfig as DenominationConfiguration)[denomination.key],
                sum: (denominationsConfig as DenominationConfiguration)[denomination.key].value * denomination.count
            })), ['sum'], ['desc']);

            it(`should add up to $${testCase.balance}`, async () => {
                const result = makeChange(testCase.total, testCase.tender);
                const sum = Object.keys(result.denominations).map(key => ({ key, ...result.denominations[key] }))
                    .reduce((sum, n) => new Decimal(sum).add(new Decimal(n.count).times((denominationsConfig as DenominationConfiguration)[n.key].value).toPrecision(2)).toNumber(), 0);
                expect(sum).toEqual(testCase.balance);
            });



            denominationValueRanking.forEach(denomination => {
                describe(`denomination ${denomination.key}`, () => {
                    it('should have at least a count of 1', async () => {
                        expect(denomination.count).toBeGreaterThanOrEqual(1);
                    });

                    it(`should have a caption of ${(denominationsConfig as DenominationConfiguration)[denomination.key].caption}`, async () => {
                        expect(denomination.caption).toEqual((denominationsConfig as DenominationConfiguration)[denomination.key].caption);
                    });

                    it(`should have a sum less than higher-valued denomination sums`, async () => {
                        const higherValuedSums = denominationValueRanking.filter(ranking => ranking.config.value > denomination.config.value);
                        higherValuedSums.forEach(higherValueRanking => {
                            expect(denomination.sum).toBeLessThan(higherValueRanking.sum);
                        });
                    });
                    it('should have a sum higher than lesser-valued denomination sums', async () => {
                        const lesserValueSums = denominationValueRanking.filter(ranking => ranking.config.value < denomination.config.value);
                        lesserValueSums.forEach(lesserValueSums => {
                            expect(denomination.sum).toBeGreaterThan(lesserValueSums.sum);
                        });
                    });
                });
            });
        });


    });
});
