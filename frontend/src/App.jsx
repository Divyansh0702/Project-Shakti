import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import AuthCustomer from './pages/AuthCustomer'
import AuthDriver from './pages/AuthDriver'
import CustomerDashboard from './pages/CustomerDashboard'
import DriverDashboard from './pages/DriverDashboard'
import About from './pages/About'
import Safety from './pages/Safety'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Navbar from './shared/Navbar'
import './index.css'
import ManageAccount from './pages/ManageAccount'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* Add global top padding to avoid navbar collision */}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<ManageAccount />} />
          <Route path="/customer/auth" element={<AuthCustomer />} />
          <Route path="/driver/auth" element={<AuthDriver />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          <Route path="*" element={
            <div className="min-h-screen grid place-items-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
                <Link className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded" to="/">Go Home</Link>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
