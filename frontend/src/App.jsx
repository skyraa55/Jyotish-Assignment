import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css'
import Auth from './pages/Auth';
import EmployeeList from './pages/EmployeeList';
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/employeelist' element={<EmployeeList />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App
