import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    flex: 1;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Button = styled.button`
    padding: 18px;
    font-size: 64px;
    margin: 18px;
`;

interface Props {
    onPress: (number: number) => void;
}



export const KeyPadComponent = ({ onPress }: Props) => {
    const buttons = _.range(1, 10).map((number, index) => <Button key={index} onClick={() => onPress(number)}>{number}</Button>);

    return <>
        <ButtonContainer>
            {buttons}
        </ButtonContainer>
    </>;
}

export const KeyPad = KeyPadComponent;