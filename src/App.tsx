import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Topbar from './components/Header';
import SignIn from './pages/Sign_in';
import Register from './pages/Register';
import Books from './pages/Books';

function App() {
  return (
    <>
      <BrowserRouter>
        <Topbar />
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/books' element={<Books />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
