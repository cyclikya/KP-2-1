import React from 'react';
import { First, Second, Third } from './main';
import Catalog from './catalog';
import { Header, Footer, ScrollToAnchor } from './H&F';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route path="/" element={<App1 />} />
        <Route path="/catalog" element={<App2 />} />
    </Routes>
  );
}

export function App1() {
  return (
    <div>
      <Header />
      <ScrollToAnchor />
      <First />
      <Second />
      <Third />
      <Footer />
    </div>
  );
}

export function App2() {
  return (
    <div>
      <Header />
      <Catalog />
      <Footer />
    </div>
  );
}

export default App;
