import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './flows/Home'
import Flow1 from './flows/Flow1'
import Flow2 from './flows/Flow2'
import Flow3 from './flows/Flow3'
import Flow4 from './flows/Flow4'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/flow1' element={<Flow1 />} />
          <Route path='/flow2' element={<Flow2 />} />
          <Route path='/flow3' element={<Flow3 />} />
          <Route path='/flow4' element={<Flow4 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
