import React from 'react';
import './App.css';
import { ContextProvider } from './context';
import Main from "./pages/Main";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Main />
      </div>
    </ContextProvider>
  );
}

export default App;
