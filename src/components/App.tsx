import React from 'react';
import SecretLorem from './SecretLorem';

import './App.css';

const App = () => (
  <ThemeProvider theme={createTheme()}>
    <Arwes animate background='/static/images/background.jpg' pattern='/static/images/glow.png'>
        <SecretLorem /> 
    </Arwes>
  </ThemeProvider>
);

export default App;
