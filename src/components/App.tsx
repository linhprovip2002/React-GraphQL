import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import Employee from '../test/interface';
import LinkList from '../views/linkList/LinkList';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <LinkList />
      </header>
      <div className="text-3xl font-bold underline">
        <Employee name="John" age={20} country="USA" />
      </div>
    </div>
  );
}

export default App;
