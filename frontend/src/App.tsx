import React from 'react';
import './App.css';
import { AuthProvider } from './provider/AuthProvider';

import ParentComponent from './components/ParentComponent';


function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <section className='Header-section'>
          <header className='App-header'>
            <h1>Trio App</h1>
          </header>
        </section>
        <main className='App-main'>
          <section className='Login-section'>
            <ParentComponent />
          </section>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
