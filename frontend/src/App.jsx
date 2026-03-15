import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css'
import Auth from './pages/Auth';
import EmployeeList from './pages/EmployeeList';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/employeelist' element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>

  )
}

export default App
