import HomePage from './components/HomePage'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import AuthPage from './components/pages/Auth/Auth'
import UserDashboard from './components/pages/UserDashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path='/user' element={<UserDashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
