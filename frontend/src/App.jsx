import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css'
import Auth from './pages/Auth';
import EmployeeList from './pages/EmployeeList';
import ProtectedRoute from './components/ProtectedRoute';
import Details from './pages/Details';
import Analytics from './pages/Analytics';
import SalaryChart from './components/SalaryChart';
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/employeelist' element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/analytics/:id' element={<Analytics />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App
