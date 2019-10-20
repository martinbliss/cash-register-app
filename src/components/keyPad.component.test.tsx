import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { KeyPadComponent } from './keyPad.component';
import _ from 'lodash';


describe('KeyPad', () => {

    it('should render successfully', async () => {
        const onPressSpy = jest.fn();
        render(<KeyPadComponent onPress={onPressSpy} />);
    });

    _.range(1, 10).forEach(number => {
        it(`should have a ${number} button`, async () => {
            const onPressSpy = jest.fn();
            const { findByText } = render(<KeyPadComponent onPress={onPressSpy} />);
            await findByText(number.toString()); 1
        });
    });
});