import HomePage from './pages/HomePage'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import AuthPage from './pages/Auth/Auth'
import UserDashboard from './pages/User/UserDashboard'
import { ProtectedRoute } from './pages/Auth/ProtectedRoute'
import DriverDashboard from "../src/pages/Driver/DriverDashboard"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path='/user' element={<ProtectedRoute path="/login" component={<UserDashboard />} />}
          />
          <Route path='/driver' element={<DriverDashboard />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
