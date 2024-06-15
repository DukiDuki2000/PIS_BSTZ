import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Topbar from './components/Header';
import SignIn from './pages/Sign_in';
import Register from './pages/Register';
import Books from './pages/Books';
import Footer from './components/Footer'
import About_Us from './pages/About_Us';
import Add_book from './pages/Panel/Add_book';
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
          <Route path='/about_us' element={<About_Us />} />
          <Route path='/add_book' element={<Add_book />} />
        </Routes>
        <Footer companyName='Firma Krzak Sp. z o.o.' year={2024}/>
      </BrowserRouter>
    </>
  );
}

export default App;
