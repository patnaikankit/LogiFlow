import HomePage from './pages/HomePage'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import AuthPage from './pages/Auth/Auth'
import UserDashboard from './pages/User/UserDashboard'
import { ProtectedRoute } from './pages/Auth/ProtectedRoute'
import DriverDashboard from "../src/pages/Driver/DriverDashboard"
import { AdminLogin } from "../src/pages/Auth/AdminAuth"
import { AdminDashboard } from "../src/pages/Admin/AdminDashboard"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path='/auth-admin' element={<AdminLogin />} />
          {/* <Route path='/user' element={<ProtectedRoute component={<UserDashboard />} />}
          /> */}
          <Route path='/user' element={<UserDashboard />}/>
          <Route path='/driver' element={<DriverDashboard />}/>
          <Route path='/admin' element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
