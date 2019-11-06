import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CashRegisterContainerComponent, CashRegisterContainer } from './containers/cash-register-container.container';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { InventoryManagerContainer } from './containers/inventoryManager.container';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: columns;
`;

const Section = styled.div`

`;

const GrowthSection = styled.div`
  flex-grow: 1;
  background-color: #34495e;
`;

const Tabs = styled.div`
  display: flex;  
  flex-direction: column;

  a {

    &, &:visited, &:hover {
      text-decoration: none !important;      
    }

    color: #09d3ac;
  }

  button {
    cursor: pointer !important;
  }
`;

const TabItem = styled.div`
  font-size: 32px;
  padding: 18px;
  text-decoration: none !important;
  
  &:hover {
    color: #e74c3c;
  }
`;


const App = ({ }) => {
  return <BrowserRouter>
    <AppContainer className="App">
      <Section className="App-header">
        <Tabs>
          <Link to="/"><TabItem>Cash Register</TabItem></Link>
          <Link to="/inventory"><TabItem>Inventory Management</TabItem></Link>
        </Tabs>
      </Section>
      <GrowthSection>
        <Switch>
          <Route path="/inventory" component={InventoryManagerContainer} />
          <Route path="/" component={CashRegisterContainer} />
        </Switch>
      </GrowthSection>
    </AppContainer>
  </BrowserRouter>;
}
export default App;
